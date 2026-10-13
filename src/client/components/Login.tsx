import { useState, type FormEvent } from 'react'
import '../styles/CreatePreviewPage.css'
import { useAuthModal } from '../util'
// import axios from 'axios'
import { useUser } from '../context/UserConfigContext'
import { apiClient } from '../../server/api'
import axios from 'axios'

// type LoginModalProps = {
//     // isOpen: boolean
//     // onClose: () => void
// }




export default function Login() {
    // const panelRef = useRef<HTMLElement>(null)
    const { setAuthParam, deleteAuthParam } = useAuthModal()
    const {setUser} = useUser()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [staySignedIn, setStaySignedIn] = useState(false)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        signin()
    }
    async function signinLogic() : Promise<boolean>
{

    try {
        console.log(password)
      const res = await apiClient.post('/account/login', {
        email: username,
        password: password,
      });
      console.log('status code', res.status)
      if (res.status == 200)
      {
        // save token to localStorage
        const token = res.data.token;
        localStorage.setItem('sessionToken', token);

        // set user data
        console.log('setting user data to', res.data.user)
        

        setUser(res.data.user);

        return true;
      }
      else
      {
        console.error("error getting data", res.data.error)
        return false
      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Access server error message (e.g., res.status 401 or 400)
        console.error(error.response?.data?.error || 'Authentication failed');
      } else {
        console.error('An unexpected error occurred:', error);
      }
      return false;
    }
}

    async function signin()
    {
        const didSucceed = await signinLogic()
        if(didSucceed == true)
        {
            setUsername('')
            setPassword('')
            deleteAuthParam()
            
            console.log('user has logged in')
        }
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