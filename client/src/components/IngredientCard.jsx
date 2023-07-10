import { useState } from 'react'

const IngredientCard = ({ ingredient }) => {
  const [formValues, setFormValues] = useState({
    name: ingredient.label,
    edamanID: ingredient.foodId,
    measure: '',
    quantity: 0
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="quantity"
          id="quantity"
          step=".1"
          value={formValues.quantity}
          min="0"
          onChange={handleChange}
        />
        <label htmlFor="quantity">quantity</label>
        <select
          name="measure"
          id="measure"
          onChange={handleChange}
          defaultValue={''}
        >
          <option value="" disabled>
            Select unit measure
          </option>
          {ingredient.measures.map((measure) => (
            <option value={measure.label}>{measure.label}</option>
          ))}
        </select>
        <label htmlFor="measure">measure</label>
        <button>Add to recipe</button>
      </form>
    </div>
  )
}

export default IngredientCard
