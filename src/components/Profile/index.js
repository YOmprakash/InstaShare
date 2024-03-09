// index.js

import React from 'react'

import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import './index.css'

const Profile = ({myProfile, owner}) => {
  const renderStories = () => {
    if (myProfile.stories.length !== 0) {
      return (
        <ul className="up-stories-container">
          {myProfile.stories.map(eachItem => {
            const {id, image} = eachItem
            return (
              <li key={id} className="up-story-item">
                <img
                  alt={`${owner} story`}
                  src={image}
                  className="up-story-image"
                />
              </li>
            )
          })}
        </ul>
      )
    }
    return null
  }

  const renderPosts = () => {
    if (myProfile.posts.length !== 0) {
      return (
        <ul className="up-posts-container">
          {myProfile.posts.map(eachItem => {
            const {id, image} = eachItem
            return (
              <li key={id} className="up-post-container">
                <img
                  alt={`${owner} post`}
                  src={image}
                  className="up-post-image"
                />
              </li>
            )
          })}
        </ul>
      )
    }
    return (
      <div className="up-no-posts-container">
        <div className="up-no-posts-icon-container">
          <BiCamera className="up-no-posts-icon" />
        </div>
        <h1 className="up-no-posts-message">No Posts Yet</h1>
      </div>
    )
  }

  return (
    <>
      <div className="up-container">
        <div className="up-header">
          <div className="up-info-container">
            <img
              src={myProfile.profile_pic}
              alt={`${owner} profile`}
              className="up-avatar-lg"
            />

            <div>
              <h1 className="up-name">{myProfile.user_name}</h1>
              <div className="up-avatar-counts-container">
                <img
                  src={myProfile.profile_pic}
                  alt={`${owner} profile`}
                  className="up-avatar-sm"
                />
                <ul className="up-counts-container">
                  <li className="up-count-item">
                    <h1 className="up-count-value">{myProfile.posts_count}</h1>
                    <p className="up-count-label">posts</p>
                  </li>
                  <li className="up-count-item">
                    <h1 className="up-count-value">
                      {myProfile.followers_count}
                    </h1>
                    <p className="up-count-label">followers</p>
                  </li>
                  <li className="up-count-item">
                    <h1 className="up-count-value">
                      {myProfile.following_count}
                    </h1>
                    <p className="up-count-label">following</p>
                  </li>
                </ul>
              </div>
              <p className="up-username">{myProfile.user_id}</p>
              <p className="up-bio">{myProfile.user_bio}</p>
            </div>
          </div>

          {renderStories()}
        </div>
        <hr className="up-horizontal-rule" />
        <div className="up-tab">
          <BsGrid3X3 className="up-tab-icon" />
          <h1 className="up-tab-label">Posts</h1>
        </div>
        {renderPosts()}
      </div>
    </>
  )
}

export default Profile
