// Header.js
import {useState} from 'react'
import {IconMenu2, IconX} from '@tabler/icons-react'
import {FaSearch} from 'react-icons/fa'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import image from '../Images/image1.jpg'
import './index.css'

const Header = ({onSearchInputChange, props}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleHamburger = () => {
    setMenuOpen(!menuOpen)
  }

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="desktop-container">
        <div className="header-logo-container">
          <Link to="/" className="nav-link">
            <img src={image} alt="logo" className="logo" />
            <span>Insta Share</span>
          </Link>
        </div>

        <button type="button" className="menu-icon" onClick={toggleHamburger}>
          {menuOpen ? (
            <IconX size={32} className="icon-x" />
          ) : (
            <IconMenu2 size={32} className="menu-icon" />
          )}
        </button>
        <ul className={`desktop-ul-container ${menuOpen ? 'open' : ''}`}>
          <li>
            <div className="search-container">
              <input
                type="search"
                placeholder="search caption"
                onChange={e => onSearchInputChange(e.target.value)}
              />
              <button type="button" aria-label="icons" data-testid="icon">
                <FaSearch />
              </button>
            </div>
          </li>
          <li>
            <Link className="nav-link" to="/" onClick={toggleHamburger}>
              Home
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/my-profile"
              onClick={toggleHamburger}
            >
              Profile
            </Link>
          </li>

          <button
            className="header-button"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
