import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  let userOptions
  if (user) {
    userOptions = (
      <nav className="flex items-center w-full justify-between p-4 bg-green-500">
        <Link to="/" className="text-2xl">
          Pantry
        </Link>
        <div>
          <Link to="/recipes" className="text-lg mx-2">
            Recipes
          </Link>
          <Link to="/groceries" className="text-lg mx-2">
            Grocery lists
          </Link>
          <Link onClick={handleLogOut} to="/login" className="text-lg mx-2">
            Sign Out
          </Link>
        </div>
      </nav>
    )
  }

  const publicOptions = (
    <nav className="flex items-center w-full justify-between p-4 bg-green-500">
      <Link to="/" className="text-2xl">
        Pantry
      </Link>
      <div>
        <Link to="/register" className="text-lg mx-2">
          Register
        </Link>
        <Link to="/login" className="text-lg mx-2">
          Sign In
        </Link>
      </div>
    </nav>
  )

  return <header>{user ? userOptions : publicOptions}</header>
}

export default Nav
