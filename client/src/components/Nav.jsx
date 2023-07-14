import { NavLink } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  let userOptions
  if (user) {
    userOptions = (
      <nav className="flex items-center w-full justify-between p-4 ">
        <NavLink to="/" className="text-2xl flex titleFont">
          <img src="/shopping-bag.png" alt="Logo" className="w-8 h-8 mr-2" />
          PANTRY
        </NavLink>
        <div className="text-sm sm:text-lg" id="navLinks">
          <NavLink to="/recipes" className="mx-2">
            Recipes
          </NavLink>
          <NavLink to="/groceries" className="mx-2">
            Groceries
          </NavLink>
          <NavLink onClick={handleLogOut} to="/login" className="mx-2">
            Sign Out
          </NavLink>
        </div>
      </nav>
    )
  }

  const publicOptions = (
    <nav className="flex items-center w-full justify-between p-4">
      <NavLink to="/" className="text-2xl flex">
        <img src="/shopping-bag.png" alt="Logo" className="w-8 h-8 mr-2" />
        PANTRY
      </NavLink>
      <div className="text-sm sm:text-lg" id="navLinks">
        <NavLink to="/register" className="mx-2">
          Register
        </NavLink>
        <NavLink to="/login" className="mx-2">
          Login
        </NavLink>
      </div>
    </nav>
  )

  return <header>{user ? userOptions : publicOptions}</header>
}

export default Nav
