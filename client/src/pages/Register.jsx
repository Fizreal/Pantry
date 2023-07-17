import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/Auth'

const Register = () => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [disabled, setDisabled] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [checkErrors, setCheckErrors] = useState(false)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    setCheckErrors((prev) => !prev)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await RegisterUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password
      })
      setFormValues({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      navigate('/login')
    } catch (error) {
      setFormValues({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      setErrorMessage(error.response.data)
    }
  }

  useEffect(() => {
    let checkDisabled =
      formValues.password === formValues.passwordConfirm ? false : true
    setDisabled(checkDisabled)
    setErrorMessage(
      checkDisabled && formValues.passwordConfirm ? 'Passwords must match' : ''
    )
  }, [checkErrors])

  return (
    <div className="w-full max-w-xs mt-16">
      <form
        onSubmit={handleSubmit}
        className="bg-black/30 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            name="passwordConfirm"
            value={formValues.passwordConfirm}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-xs italic">{errorMessage}</p>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={disabled}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
