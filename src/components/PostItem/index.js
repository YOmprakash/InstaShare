import {useState} from 'react'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import Cookies from 'js-cookie'

import './index.css'

const PostItem = ({posts, setPosts}) => {
  const [likedPosts, setLikedPosts] = useState({})

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
  return (
    <div className="home-container">
      <div className="home-card-container">
        <ul className="post-ul-container">
          {posts.map(post => (
            <li key={post.post_id} className="post-card">
              <Link to={`/users/${post.user_id}`} className="nav-link">
                <div className="user-name-container">
                  <img src={post.profile_pic} alt="post author profile" />

                  <p>{post.user_name}</p>
                </div>
              </Link>

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
                      <span>{comment.user_name} </span>
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
}

export default PostItem
