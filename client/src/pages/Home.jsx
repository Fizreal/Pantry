import { Link } from 'react-router-dom'

const Home = ({ handleSubmit }) => {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/recipes/new">
        <button>Start new recipe</button>
      </Link>
      <form onSubmit={handleSubmit}>
        <button>Start new grocery</button>
      </form>
    </div>
  )
}

export default Home
