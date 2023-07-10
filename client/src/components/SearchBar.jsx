const SearchBar = ({ handleSubmit, handleChange, search }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
