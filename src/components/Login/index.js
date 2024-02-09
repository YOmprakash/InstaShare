import {useState} from 'react'

import {useHistory, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

import image from '../Images/image1.jpg'
import Illustration from '../Images/Illustration.png'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()

  const onsubmitForm = async e => {
    e.preventDefault()

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      // Login successful, navigate to Home Route
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      // Login failed, display error message
      console.error('Login failed:', data.error_msg)
      setErrorMsg(data.error_msg)
    }
  }
  const onchangeUsername = e => {
    setUsername(e.target.value)
  }

  const onchangePassword = e => {
    setPassword(e.target.value)
  }
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-container">
      <div className="login-card-container">
        <img src={Illustration} alt="website login" className="desktop-image" />
        <form className="form-container" onSubmit={onsubmitForm}>
          <div className="logo-container">
            <img src={image} alt="website logo" className="login-logo" />
            <h1>Insta Share</h1>
          </div>
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            placeholder="username:rahul"
            id="username"
            value={username}
            onChange={onchangeUsername}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            placeholder="password:rahul@2021"
            id="password"
            value={password}
            onChange={onchangePassword}
          />
          <p className="error-msg">{errorMsg}</p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}
export default Login
