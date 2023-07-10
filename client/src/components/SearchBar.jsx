const SearchBar = ({ handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" />
        <button>Search</button>
      </form>
    </div>
  )
}

export default SearchBar
