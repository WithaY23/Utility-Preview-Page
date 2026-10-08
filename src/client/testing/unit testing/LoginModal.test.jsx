import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import AccountModalContainer from '../../components/AccountModalContainer'

function CurrentSearch() {
  const { search } = useLocation()

  return <output data-testid="current-search">{search}</output>
}

function renderAccountModal(initialEntry = '/view?auth=signin') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <AccountModalContainer />
      <CurrentSearch />
    </MemoryRouter>,
  )
}

describe('Account modal', () => {
  test('renders nothing when there is no auth query parameter', () => {
    renderAccountModal('/view')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('tracks login form state without faking a login', async () => {
    const user = userEvent.setup()
    renderAccountModal()

    const username = screen.getByRole('textbox', { name: 'Username:' })
    const password = screen.getByLabelText('Password:')
    const staySignedIn = screen.getByRole('checkbox', { name: 'Stay signed in' })

    await user.type(username, 'sample-user')
    await user.type(password, 'sample-password')
    await user.click(staySignedIn)
    await user.click(screen.getByRole('button', { name: 'Login' }))

    expect(username).toHaveValue('sample-user')
    expect(password).toHaveValue('sample-password')
    expect(staySignedIn).toBeChecked()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Welcome!' })).toBeInTheDocument()
  })

  test('switches between sign-in and signup using the auth query parameter', async () => {
    const user = userEvent.setup()
    renderAccountModal()

    await user.click(screen.getByRole('button', { name: 'Create one' }))

    expect(screen.getByRole('heading', { name: 'Create an Account!' })).toBeInTheDocument()
    expect(screen.getByTestId('current-search')).toHaveTextContent('auth=signup')
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Sign in instead' }))

    expect(screen.getByRole('heading', { name: 'Welcome!' })).toBeInTheDocument()
    expect(screen.getByTestId('current-search')).toHaveTextContent('auth=signin')
  })

  test('closes from the close button and Escape key', async () => {
    const user = userEvent.setup()
    const { unmount } = renderAccountModal()

    await user.click(screen.getByRole('button', { name: 'Close account dialog' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByTestId('current-search')).not.toHaveTextContent('auth=')

    unmount()
    renderAccountModal()
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})