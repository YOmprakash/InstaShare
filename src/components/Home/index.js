import {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import Cookies from 'js-cookie'
import Loader from '../Loader'
import Header from '../Header'
import UserStories from '../UserStories'
import Posts from '../Posts'
import SearchPost from '../SearchPost'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Home = () => {
  const [posts, setPosts] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [isClicked, setClick] = useState(false)

  const updateSearchQuery = value => {
    setSearchInput(value)

    if (searchInput === '') {
      setApiStatus(apiStatusConstants.initial)
    }
  }
  const fetchPosts = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress)
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`

      const response = await fetch(apiUrl, options)
      console.log(response)

      if (response.ok) {
        const data = await response.json()
        console.log(data.posts)
        setPosts(data.posts)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)

      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header
        updateSearchQuery={updateSearchQuery}
        searchInput={searchInput}
        setClick={setClick}
        fetchPosts={fetchPosts}
      />
      {searchInput === '' ? (
        <>
          <UserStories />
          <Posts />
        </>
      ) : (
        <SearchPost
          searchInput={searchInput}
          apiStatus={apiStatus}
          posts={posts}
          setPosts={setPosts}
          fetchPosts={fetchPosts}
        />
      )}
    </>
  )
}

export default Home
