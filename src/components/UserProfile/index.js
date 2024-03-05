import {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'

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
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setMyProfile(data.user_details)

        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
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
      <p className="failure_heading">Something went wrong. Please try again</p>
      <button
        onClick={() => fetchUserProfile()}
        type="submit"
        className="failure-button"
      >
        Try Again
      </button>
    </div>
  )

  const renderSuccessView = () => <Profile myProfile={myProfile} />
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
