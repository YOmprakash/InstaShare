import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './index.css'

const Profile = ({myProfile, owner}) => (
  <div className="profile-container">
    <div className="profile-card-container">
      <div className="info-card">
        <h1 className="mobile-h1">{myProfile.user_name}</h1>
        <div className="profile-info-container">
          <img
            src={myProfile.profile_pic}
            alt={`${owner} profile`}
            className="profile-pic"
          />
          <div className="info">
            <h1>{myProfile.user_name}</h1>
            <div className="follower-card">
              <p>{myProfile.posts_count} Posts</p>
              <p>{myProfile.followers_count} Followers</p>
              <p>{myProfile.following_count} Following</p>
            </div>
            <span>{myProfile.user_name}</span>
            <p className="bio">{myProfile.user_bio}</p>
          </div>
        </div>
        <div className="mobile-info">
          <h1>{myProfile.user_name}</h1>
          <p>{myProfile.user_bio}</p>
        </div>
        <ul className="stories-container">
          {myProfile.stories.map(each => (
            <li key={each.id}>
              <img src={each.image} alt={`${owner} story`} />
            </li>
          ))}
        </ul>
      </div>
      <hr className="line" />
      <div className="post-head-card">
        <BsGrid3X3 color="#262626" height={14} width={14} />
        <h1>Posts</h1>
      </div>
      {myProfile.posts.length > 0 ? (
        <ul className="profile-ul-container">
          {myProfile.posts.map(each => (
            <li key={each.id} className="list-item-myProfile">
              <img
                src={each.image}
                alt={`${owner} post`}
                className="my-profile-post-img"
              />
            </li>
          ))}
        </ul>
      ) : (
        <>
          <BiCamera />
          <h1>No Posts</h1>
        </>
      )}
    </div>
  </div>
)

export default Profile
