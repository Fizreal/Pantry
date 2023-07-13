const SearchBar = ({ handleSubmit, handleChange, search }) => {
  return (
    <section name="Search bar">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleChange}
          className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button className="justify-center my-2 py-1 px-2  self-center border rounded-xl">
          Search
        </button>
      </form>
    </section>
  )
}

export default SearchBar
