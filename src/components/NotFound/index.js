import {Link} from 'react-router-dom'
import './index.css'
import error from '../Images/error.png'

const NotFound = () => (
  <div className="not-found-container">
    <img src={error} alt="page not found" className="not-found-img" />
    <h1>Page Not Found</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <Link to="/">
      <button type="button">Home Page</button>
    </Link>
  </div>
)

export default NotFound
