import { useState, type FormEvent } from 'react'
import '../styles/CreatePreviewPage.css'
import { useAuthModal } from '../util'

// type LoginModalProps = {
//     // isOpen: boolean
//     // onClose: () => void
// }

export default function Login() {
    // const panelRef = useRef<HTMLElement>(null)
    const { setAuthParam } = useAuthModal()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [staySignedIn, setStaySignedIn] = useState(false)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }


 

    return (
        <>
            <h2 id="account-modal-heading">Welcome!</h2>
        <form className="login-modal__form" onSubmit={handleSubmit}>
            <label className="login-modal__label" htmlFor="login-username">
                Username:
            </label>
            <input
                id="login-username"
                className="login-modal__input"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <label className="login-modal__label" htmlFor="login-password">
                Password:
            </label>
            <input
                id="login-password"
                className="login-modal__input"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <label className="login-modal__remember">
                <input
                    type="checkbox"
                    checked={staySignedIn}
                    onChange={(event) => setStaySignedIn(event.target.checked)}
                />
                Stay signed in
            </label>
            <button className="login-modal__submit" type="submit">
                Login
            </button>
        </form>
        <p className="login-modal__switch">
            Don't have an account?{' '}
            <button
                className="login-modal__switch-button"
                type="button"
                onClick={(e) => {e.stopPropagation(); setAuthParam('signup')}}
            >
                Create one
            </button>
        </p>
    </>

    )
}