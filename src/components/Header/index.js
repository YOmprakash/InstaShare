// Header.js
import {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import {IoClose} from 'react-icons/io5'
import {IoMdMenu} from 'react-icons/io'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import image from '../Images/image1.jpg'
import {useSearch} from '../../context/SearchContext'

import './index.css'

const Header = ({history}) => {
  const {searchInput, onChangeSearchInput, setSearchPostView} = useSearch()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleHamburger = () => {
    setMenuOpen(!menuOpen)
  }
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickSearchIcon = () => {
    setSearchPostView(true) // Toggle search post view
  }
  return (
    <nav className="nav-container">
      <div className="desktop-container">
        <Link to="/" className="nav-link">
          <div className="header-logo-container">
            <img src={image} alt="website logo" className="logo" />
            <h1>Insta Share</h1>
          </div>
        </Link>

        <button type="button" className="menu-icon" onClick={toggleHamburger}>
          {menuOpen ? (
            <IoClose size={32} className="icon-x" />
          ) : (
            <IoMdMenu size={32} className="menu-icon" />
          )}
        </button>
        <ul className={`desktop-ul-container ${menuOpen ? 'open' : ''}`}>
          <li>
            <div className="search-container">
              <input
                type="search"
                placeholder="Search Caption"
                value={searchInput}
                onChange={e => onChangeSearchInput(e.target.value)}
              />
              <button
                type="button"
                data-testid="searchIcon"
                onClick={onClickSearchIcon}
              >
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
