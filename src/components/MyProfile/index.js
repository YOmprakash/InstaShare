import {useState, useEffect} from 'react'

import {BiCamera} from 'react-icons/bi'
import {BsGrid3X3} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Header from '../Header'
import Loader from '../Loader'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const MyProfile = () => {
  const [myProfile, setMyProfile] = useState(null)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const fetchMyProfile = async () => {
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
        'https://apis.ccbp.in/insta-share/my-profile',
        options,
      )

      const data = await response.json()
      console.log(data)
      setMyProfile(data.profile)
      setApiStatus(apiStatusConstants.success)
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
      console.error('Error fetching my profile:', error)
    }
  }
  useEffect(() => {
    fetchMyProfile()
  }, []) // Empty dependency array means this effect runs once on mount
  const renderSuccessView = () => (
    <>
      {myProfile && myProfile.length === 0 ? (
        <div>
          <BiCamera />
          <h1>No Posts</h1>
        </div>
      ) : (
        <div className="profile-container">
          <div className="profile-card-container">
            <div className="profile-info-container">
              <img
                src={myProfile.profile_pic}
                alt="my profile"
                className="profile-pic"
              />
              <div className="info">
                <h1>{myProfile.user_name}</h1>
                <div className="follower-card">
                  <p>{myProfile.posts_count} Posts</p>
                  <p>{myProfile.followers_count} Followers</p>
                  <p>{myProfile.following_count} Following</p>
                </div>
                <p>{myProfile.user_id}</p>
                <p>{myProfile.user_bio}</p>
              </div>
            </div>
            <ul className="stories-container">
              {myProfile.stories.map(each => (
                <li key={each.id}>
                  <img src={each.image} alt="my story" />
                </li>
              ))}
            </ul>
            <hr className="line" />
            <div className="post-head-card">
              <BsGrid3X3 />
              <h1>No Posts</h1>
            </div>

            <ul className="profile-ul-container">
              {myProfile.posts.map(each => (
                <li key={each.id}>
                  <img src={each.image} alt="my post" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dziwdneks/image/upload/v1675454266/HomeFaillureImg_qz05si.png"
        alt="failure view"
        className="user_story_failure_img"
      />
      <p className="failure_heading">Something went wrong. Please try again</p>
      <button
        onClick={() => fetchMyProfile()}
        type="submit"
        className="failure-button"
      >
        Try again
      </button>
    </div>
  )

  const renderMyProfile = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <Loader />
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return myProfile === null ? renderFailureView() : null

      default:
        return null
    }
  }

  return (
    <>
      <Header />
      {renderMyProfile()}
    </>
  )
}

export default MyProfile
