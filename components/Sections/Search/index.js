import React from 'react'
import Card from 'components/Card'
import { DataContext } from 'Contexts/DataContext'

const Search = () => {

  const {searchText, updateSearchText, fetchData} = React.useContext(DataContext)

  const handleChange = (event) => {
    updateSearchText(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchData()
    }
  }

  return (
    <Card className="px-6 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        value={searchText}
        onKeyDown={handleKeyDown}
        className="flex-1 outline-none"
        placeholder="Search for any job, title, keyword or company"
        onChange={handleChange}
      />
    </Card>
  )
}

export default Search;