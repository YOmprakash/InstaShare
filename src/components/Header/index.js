import {useState} from 'react'
import {FaSearch} from 'react-icons/fa'

import {IoIosMenu} from 'react-icons/io'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import image from '../Images/image1.jpg'

import './index.css'

const Header = ({history, fetchPosts, updateSearchQuery, searchInput}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const onSearch = () => {
    fetchPosts()
  }

  const onChangeSearchQuery = event => {
    updateSearchQuery(event.target.value)
  }

  const toggleHamburger = () => {
    setMenuOpen(!menuOpen)
  }
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
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
          <IoIosMenu size={32} />
        </button>
        <ul className={`desktop-ul-container ${menuOpen ? 'open' : ''}`}>
          <li>
            <div className="search-container">
              <input
                type="search"
                placeholder="Search Caption"
                value={searchInput}
                onChange={onChangeSearchQuery}
              />
              <button
                className="search-icon"
                type="button"
                testid="searchIcon"
                onClick={onSearch}
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

          <button
            className="seach-mobile-btn"
            type="button"
            onClick={toggleSearch}
          >
            Search
          </button>

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
            className="logout-button"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>

          {menuOpen && (
            <button type="button" onClick={toggleHamburger}>
              X
            </button>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
