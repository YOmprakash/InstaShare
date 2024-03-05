import {useState, useEffect} from 'react'

import Cookies from 'js-cookie'
import Header from '../Header'
import Loader from '../Loader'
import Profile from '../Profile'

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

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setMyProfile(data.profile)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
      console.error('Error fetching my profile:', error)
    }
  }
  useEffect(() => {
    fetchMyProfile()
  }, {})
  const renderSuccessView = () => <Profile myProfile={myProfile} owner="my" />

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
        return renderFailureView()
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
