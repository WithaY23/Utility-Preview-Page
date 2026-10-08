import { useState, type FormEvent } from 'react'
import '../styles/CreatePreviewPage.css'
import { useAuthModal } from '../util'

export default function Signup() {
    const { setAuthParam } = useAuthModal()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <>
            <h2 id="account-modal-heading">Create an Account!</h2>
            <form className="login-modal__form" onSubmit={handleSubmit}>
                <label className="login-modal__label" htmlFor="signup-username">
                    Username:
                </label>
                <input
                    id="signup-username"
                    className="login-modal__input"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <label className="login-modal__label" htmlFor="signup-password">
                    Password:
                </label>
                <input
                    id="signup-password"
                    className="login-modal__input"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button className="login-modal__submit" type="submit">
                    Create Account
                </button>
            </form>
            <p className="login-modal__switch">
                Already have an account?{' '}
                <button
                    className="login-modal__switch-button"
                    type="button"
                    onClick={() => setAuthParam('signin')}
                >
                    Sign in instead
                </button>
            </p>
        </>
    )
}