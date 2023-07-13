import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Home = ({ handleSubmit, user }) => {
  let navigate = useNavigate()
  return user ? (
    <section>
      <h1>Welcome</h1>
      <Link to="/recipes/new">
        <button>Start new recipe</button>
      </Link>
      <form onSubmit={handleSubmit}>
        <button>Start new grocery</button>
      </form>
    </section>
  ) : (
    <div className="flex flex-col items-center">
      <h1>Oops! You must be signed in to do that!</h1>
      <button
        onClick={() => navigate('/login')}
        className="my-2 py-1 px-2 border rounded-xl"
      >
        Sign In
      </button>
    </div>
  )
}

export default Home
