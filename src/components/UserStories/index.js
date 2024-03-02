import React, {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from '../Loader'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const UserStories = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [storiesList, setStoriesList] = useState([])

  const getUserStories = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)

      if (response.ok) {
        const data = await response.json()
        const updatedData = data.users_stories.map(eachStory => ({
          userName: eachStory.user_name,
          userId: eachStory.user_id,
          storyUrl: eachStory.story_url,
        }))

        setApiStatus(apiStatusConstants.success)
        setStoriesList(updatedData)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getUserStories()
  }, [])

  const renderSuccessView = () => {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 660,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <ul>
        <Slider {...settings}>
          {storiesList.map(eachStory => (
            <li key={eachStory.userId} className="story-item">
              <img
                className="storyImg"
                alt="user story"
                src={eachStory.storyUrl}
              />
              <p className="story-userName">{eachStory.userName}</p>
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

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
        onClick={() => getUserStories()}
        type="submit"
        className="failure-button"
      >
        Try Again
      </button>
    </div>
  )

  const renderUserStories = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <Loader />
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.success:
        return renderSuccessView()
      default:
        return null
    }
  }

  return (
    <div className="main-container">
      <div className="slick-container">{renderUserStories()}</div>
    </div>
  )
}

export default UserStories
