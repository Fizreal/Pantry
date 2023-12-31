import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Login = ({ setUser, updateRecipes, updateGroceries }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const payload = await SignInUser(formValues)
      setFormValues({ email: '', password: '' })
      setUser(payload)
      updateRecipes()
      updateGroceries()
      navigate('/')
    } catch (error) {
      setFormValues({ email: '', password: '' })
      setErrorMessage(error.response.data)
    }
  }

  return (
    <div className="w-full max-w-xs mt-16">
      <form
        onSubmit={handleSubmit}
        className="bg-black/30 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-xs italic">{errorMessage}</p>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
