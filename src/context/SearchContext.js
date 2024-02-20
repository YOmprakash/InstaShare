// SearchContext.js
import React, {createContext, useContext, useState} from 'react'

const SearchContext = createContext()

export const useSearch = () => useContext(SearchContext)

export const SearchProvider = ({children}) => {
  const [searchInput, setSearchInput] = useState('')
  const [searchPostView, setSearchPostView] = useState(false)
  const [click, setClick] = useState(false)
  const [searchValue, setSearchValue] = useState(false)

  const onChangeSearchInput = input => setSearchInput(input)
  const setSearchInputView = () => setSearchPostView(prev => !prev)
  const toggleClick = () => setClick(prev => !prev)
  const toggleSearchValue = () => setSearchValue(prev => !prev)
  console.log(searchInput)
  const closeHeaderButtonIn = () => {
    setClick(prev => !prev)
  }

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        searchPostView,
        click,
        searchValue,
        onChangeSearchInput,
        setSearchInputView,
        toggleClick,
        toggleSearchValue,
        closeHeaderButtonIn,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContext
