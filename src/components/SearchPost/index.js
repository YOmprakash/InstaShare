import Loader from '../Loader'
import PostItem from '../PostItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const SearchPost = ({posts, setPosts, fetchPosts, apiStatus}) => {
  const renderInitialView = () => (
    <div className="user-profile-initial-container">
      <img
        alt="initial "
        src="https://res.cloudinary.com/aneesmon/image/upload/v1649495550/Insta_Share/search-initial_oyoblm.png"
      />
      <p>Search Results will be appear here</p>
    </div>
  )

  const renderHomeContent = () => (
    <>
      {posts.length === 0 ? (
        <div className="initial-search-results">
          <img
            src="https://i.postimg.cc/7PFcBqHF/Group.png"
            alt="search not found"
            className="user_story_failure_img"
          />
          <h1 className="failure_heading">Search Not Found</h1>
          <p>Try different keyword or search again</p>
        </div>
      ) : (
        <>
          <h1>Search Results</h1>
          <PostItem posts={posts} setPosts={setPosts} />
        </>
      )}
    </>
  )

  const onRetry = () => fetchPosts()
  const renderFailureView = () => (
    <div className="failure_view_container">
      <img
        src="https://res.cloudinary.com/dziwdneks/image/upload/v1675454266/HomeFaillureImg_qz05si.png"
        alt="failure view"
        className="user_story_failure_img"
      />

      <p className="failure_heading">Something went wrong. Please try again</p>

      <button onClick={onRetry} type="submit" className="failure-button">
        Try again
      </button>
    </div>
  )

  const renderHome = () => {
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return renderInitialView()
      case apiStatusConstants.inProgress:
        return <Loader />
      case apiStatusConstants.success:
        return renderHomeContent()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return renderHome()
}

export default SearchPost
