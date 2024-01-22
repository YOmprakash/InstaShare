import {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Header from '../Header'

const UserProfile = props => {
  const {match} = props
  const {params} = match
  const {id} = params
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
          `https://apis.ccbp.in/insta-share/users/${id}`,
          options,
        )

        const data = await response.json()
        console.log(data)
        setMyProfile(data.user_details)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching my profile:', error)
        setIsLoading(false)
      }
    }

    fetchMyProfile()
  }, [id]) // Empty dependency array means this effect runs once on mount

  return (
    <>
      <Header />
      <div className="profile-container">
        {isLoading ? (
          <div className="loader-container">Loading</div>
        ) : (
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
        )}
      </div>
    </>
  )
}

export default withRouter(UserProfile)
