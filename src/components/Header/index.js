import {useState} from 'react'
import {FaSearch} from 'react-icons/fa'

import {IoIosMenu, IoIosCloseCircle} from 'react-icons/io'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import image from '../Images/image1.jpg'

import './index.css'

const Header = ({
  history,
  setClick,
  fetchPosts,
  updateSearchQuery,
  searchInput,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const onSearch = () => {
    setClick(true)
    fetchPosts()
  }

  const onChangeSearchQuery = event => {
    updateSearchQuery(event.target.value.toLowerCase())
  }

  const toggleHamburger = () => {
    setMenuOpen(!menuOpen)
  }
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-content">
          <Link to="/" className="nav-link">
            <div className="header-logo-container">
              <img src={image} alt="website logo" className="logo" />
              <h1>Insta Share</h1>
            </div>
          </Link>

          <button type="button" className="menu-icon" onClick={toggleHamburger}>
            <IoIosMenu size={32} />
          </button>
        </div>
        {menuOpen && (
          <ul className="nav-ul-container mobile">
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
                  data-testid="searchIcon"
                  onClick={onSearch}
                >
                  <FaSearch />
                </button>
              </div>
            </li>
            <li>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="mobile-search-btn"
                onClick={toggleSearch}
              >
                Search
              </button>
            </li>

            <li>
              <Link className="nav-link" to="/my-profile">
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
            <button type="button" onClick={toggleHamburger} className="close">
              <IoIosCloseCircle size={24} />
            </button>
          </ul>
        )}
        <ul className="nav-ul-container desktop">
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
                data-testid="searchIcon"
                onClick={onSearch}
              >
                <FaSearch color="#989898" />
              </button>
            </div>
          </li>
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="mobile-search-btn"
              onClick={toggleSearch}
            >
              Search
            </button>
          </li>

          <li>
            <Link className="nav-link" to="/my-profile">
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
        </ul>

        {isSearchOpen && menuOpen && (
          <div className="mob-search-container">
            <input
              type="search"
              placeholder="Search Caption"
              value={searchInput}
              onChange={onChangeSearchQuery}
            />

            <button
              className="mob-search-icon"
              type="button"
              data-testid="searchIcon"
              onClick={onSearch}
            >
              <FaSearch color="#fff" />
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default withRouter(Header)
