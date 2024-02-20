import Header from '../Header'
import Home from '../Home'
import SearchResults from '../SearchResults'
import {useSearch} from '../../context/SearchContext'

const Condition = () => {
  const {searchInput} = useSearch()

  return (
    <>
      <Header />
      <div className="bg-color">
        {searchInput ? <SearchResults /> : <Home />}
      </div>
    </>
  )
}
export default Condition
