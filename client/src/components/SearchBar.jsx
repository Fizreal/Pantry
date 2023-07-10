import { useState } from 'react'

const SearchBar = ({ handleSubmit }) => {
  const [search, setSearch] = useState('')

  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, search)}>
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleChange}
        />
        <button>Search</button>
      </form>
    </div>
  )
}

export default SearchBar
