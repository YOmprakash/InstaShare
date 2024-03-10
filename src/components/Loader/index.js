import Loader from 'react-loader-spinner'
import './index.css'

const LoaderForm = () => (
  <div className="loader-container" data-testid="loader">
    <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
  </div>
)

export default LoaderForm
