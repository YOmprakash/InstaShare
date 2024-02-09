import {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'

import {BsGrid3X3} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Header from '../Header'
import Loader from '../Loader'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const UserProfile = props => {
  const {match} = props
  const {params} = match
  const {id} = params
  const [myProfile, setMyProfile] = useState(null)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const fetchUserProfile = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress)
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(
        `https://apis.ccbp.in/insta-share/users/${id}`,
        options,
      )

      const data = await response.json()
      console.log(data)
      setMyProfile(data.user_details)

      setApiStatus(apiStatusConstants.success)
    } catch (error) {
      console.error('Error fetching my profile:', error)

      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, []) // Empty dependency array means this effect runs once on mount

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dziwdneks/image/upload/v1675454266/HomeFaillureImg_qz05si.png"
        alt="failure view"
        className="user_story_failure_img"
      />
      <h1 className="failure_heading">
        Something went wrong. Please try again
      </h1>
      <button
        onClick={() => fetchUserProfile()}
        type="submit"
        className="failure-button"
      >
        Try Again
      </button>
    </div>
  )

  const renderSuccessView = () => (
    <>
      {myProfile.posts_count > 0 ? (
        <div className="profile-container">
          <div className="profile-card-container">
            <div className="profile-info-container">
              <img src={myProfile.profile_pic} alt="profile" />
              <div className="info">
                <h1>{myProfile.user_name}</h1>
                <div className="follower-card">
                  <p>{myProfile.followers_count}</p>
                  <p>{myProfile.posts_count}</p>
                  <p>{myProfile.following_count}</p>
                </div>
                <p>{myProfile.user_id}</p>
                <p>{myProfile.user_bio}</p>
              </div>
            </div>
            <ul className="stories-container">
              {myProfile.stories.map(each => (
                <li key={each.id}>
                  <img src={each.image} alt="post" />
                </li>
              ))}
            </ul>
            <div>
              <BsGrid3X3 />
              <h1>Posts</h1>
            </div>

            <ul>
              {myProfile.posts.map(each => (
                <li key={each.id}>
                  <img src={each.image} alt="post" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>hello</div>
      )}
    </>
  )

  const renderUserProfile = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <Loader />

      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      {renderUserProfile()}
    </>
  )
}

export default withRouter(UserProfile)