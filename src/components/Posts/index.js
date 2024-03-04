import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import Cookies from 'js-cookie'
import Loader from '../Loader'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [likedPosts, setLikedPosts] = useState({})
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
          setIsLoading(false)
          setApiStatus(apiStatusConstants.success)
        }
      } else {
        setIsLoading(false)
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      setIsLoading(false)
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleLikeClick = async postId => {
    try {
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({like_status: !likedPosts[postId]}), // Toggle like status
      }

      const response = await fetch(
        `https://apis.ccbp.in/insta-share/posts/${postId}/like`,
        options,
      )
      console.log(response)

      if (response.ok) {
        // Update likedPosts state based on postId
        setLikedPosts(prevLikedPosts => ({
          ...prevLikedPosts,
          [postId]: !prevLikedPosts[postId],
        }))
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.post_id === postId
              ? {
                  ...post,
                  likes_count: likedPosts[postId]
                    ? post.likes_count - 1
                    : post.likes_count + 1,
                }
              : post,
          ),
        )

        // Update the likes count
      } else {
        console.error('Failed to update like status')
      }
    } catch (error) {
      console.error('Error updating like status:', error)
    }
  }
  const renderHomeContent = () => (
    <div className="home-container">
      <div className="home-card-container">
        <ul className="post-ul-container">
          {posts.map(post => (
            <li key={post.post_id} className="post-card">
              <div className="user-name-container">
                <img src={post.profile_pic} alt="post author profile" />
                <Link to={`/users/${post.user_id}`} className="nav-link">
                  <p>{post.user_name}</p>
                </Link>
              </div>
              <img
                src={post.post_details.image_url}
                alt="post"
                className="post-img"
              />
              <div className="card-bottom-container">
                <div className="icons-container">
                  <button
                    type="button"
                    aria-label={likedPosts[post.post_id] ? 'Unlike' : 'Like'}
                    testid={
                      likedPosts[post.post_id] ? 'unLikeIcon' : 'likeIcon'
                    } // Test ID
                    className="post-btn"
                    onClick={() => handleLikeClick(post.post_id)} // Call handleLikeClick on click
                  >
                    {likedPosts[post.post_id] ? (
                      <FcLike className="card-icon" />
                    ) : (
                      <BsHeart className="card-icon" />
                    )}
                  </button>
                  <button
                    type="button"
                    aria-label="icons"
                    testid="shareIcon"
                    className="post-btn"
                  >
                    <FaRegComment className="card-icon" />
                  </button>
                  <button
                    type="button"
                    aria-label="icons"
                    testid="commentIcon"
                    className="post-btn"
                  >
                    <BiShareAlt className="card-icon" />
                  </button>
                </div>
                <p>{post.likes_count} Likes</p>
                <p>{post.post_details.caption}</p>
                <div>
                  {post.comments.map(comment => (
                    <p key={comment.user_id}>
                      <strong>{comment.user_name} </strong>
                      {comment.comment}
                    </p>
                  ))}
                </div>
                <p>{post.created_at}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

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
