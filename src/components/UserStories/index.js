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
      slidesToShow: 6,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <ul className="slider-container">
        <Slider {...settings}>
          {storiesList.map(eachStory => (
            <li key={eachStory.userId} className="story_container">
              <img
                className="storyImg"
                alt="user story"
                src={eachStory.storyUrl}
              />
              <p className="userName">{eachStory.userName}</p>
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

  return <div className="user_stories_container">{renderUserStories()}</div>
}

export default UserStories
