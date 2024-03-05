import {useState, useEffect} from 'react'

import Cookies from 'js-cookie'
import Loader from '../Loader'
import PostItem from '../PostItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Posts = () => {
  const [posts, setPosts] = useState([])

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

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

      const apiUrl = 'https://apis.ccbp.in/insta-share/posts'

      const response = await fetch(apiUrl, options)
      console.log(response)

      if (response.ok) {
        const data = await response.json()
        console.log(data.posts)
        if (data.posts.length === 0) {
          setApiStatus(apiStatusConstants.failure)
        } else {
          setPosts(data.posts)

          setApiStatus(apiStatusConstants.success)
        }
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

  const renderHomeContent = () => <PostItem posts={posts} setPosts={setPosts} />

  const renderFailureView = () => (
    <div className="failure_view_container">
      <img
        src="https://res.cloudinary.com/dziwdneks/image/upload/v1675454266/HomeFaillureImg_qz05si.png"
        alt="failure view"
        className="user_story_failure_img"
      />

      <p className="failure_heading">Something went wrong. Please try again</p>

      <button
        onClick={() => fetchPosts()}
        type="submit"
        className="failure-button"
      >
        Try again
      </button>
    </div>
  )

  const renderHome = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <Loader />
      case apiStatusConstants.success:
        return renderHomeContent()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <hr />
      {renderHome()}
    </>
  )
}

export default Posts
