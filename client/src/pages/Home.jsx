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
    <section name="Home" className="flex flex-col items-center mt-8">
      <h1 className="">Oops! You must be signed in to do that!</h1>
      <button
        onClick={navigate('/login')}
        className="my-2 py-1 px-2 button rounded-xl"
      >
        Sign In
      </button>
    </section>
  )
}

export default Home
