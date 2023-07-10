import GroceryCard from '../components/GroceryCard'
import { useNavigate } from 'react-router-dom'
import { createGroceryList } from '../services/groceryListServices'

const Recipes = ({ groceries, updateGroceries }) => {
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let groceryList = await createGroceryList()
    await updateGroceries()
    navigate(`/groceries/${groceryList.data._id}`)
  }
  return (
    <div>
      <h1>Grocery Lists:</h1>
      <form onSubmit={handleSubmit}>
        <button>New grocery list</button>
      </form>
      <div>
        {groceries ? (
          groceries.map((list) => (
            <GroceryCard key={list._id} groceryList={list} />
          ))
        ) : (
          <p>No grocery lists</p>
        )}
      </div>
    </div>
  )
}

export default Recipes
