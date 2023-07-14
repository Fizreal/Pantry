import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Home = ({ handleSubmit, user }) => {
  let navigate = useNavigate()
  return user ? (
    <section className="flex flex-col items-center mt-8">
      <h1 className="text-2xl mb-2">Welcome to Pantry</h1>
      <div className="flex">
        <div className="flex items-center justify-center card w-36 h-20 rounded-xl p-3 m-2 shadow">
          <Link to="/recipes/new">
            <button>Start new recipe</button>
          </Link>
        </div>
        <div className="flex items-center justify-center card w-36 h-20 rounded-xl p-3 m-2 shadow">
          <form onSubmit={handleSubmit}>
            <button>Start new grocery</button>
          </form>
        </div>
      </div>
    </section>
  ) : (
    <section className="flex flex-col items-center mt-8">
      <h1 className="text-2xl mb-2">Welcome to Pantry</h1>
      <div className="flex">
        <div className="flex items-center justify-center card w-36 h-20 rounded-xl p-3 m-2 shadow">
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="flex items-center justify-center card w-36 h-20 rounded-xl p-3 m-2 shadow">
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Home
