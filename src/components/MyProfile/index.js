import {useState, useEffect} from 'react'

import {BsGrid3X3} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Header from '../Header'
import Loader from '../Loader'

import './index.css'

const MyProfile = () => {
  const [myProfile, setMyProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
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
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching my profile:', error)
        setIsLoading(false)
      }
    }

    fetchMyProfile()
  }, []) // Empty dependency array means this effect runs once on mount

  return (
    <>
      <Header />
      <div className="profile-container">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="profile-card-container">
            <div className="profile-info-container">
              <img
                src={myProfile.profile_pic}
                alt="profile"
                className="profile-pic"
              />
              <div className="info">
                <p>{myProfile.user_name}</p>
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
                  <img src={each.image} alt="post" />
                </li>
              ))}
            </ul>
            <hr className="line" />
            <div className="post-head-card">
              <BsGrid3X3 />
              <h1>Posts</h1>
            </div>

            <ul className="profile-ul-container">
              {myProfile.posts.map(each => (
                <li key={each.id}>
                  <img src={each.image} alt="post" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default MyProfile
