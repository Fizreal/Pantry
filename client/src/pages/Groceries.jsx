import GroceryCard from '../components/GroceryCard'
import { useNavigate } from 'react-router-dom'
import { createGroceryList } from '../services/groceryListServices'

const Recipes = ({ groceryLists, updateGroceries }) => {
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let groceryList = await createGroceryList()
    console.log(groceryList)
    await updateGroceries()
    navigate(`/groceries/${groceryList._id}`)
  }
  return (
    <div>
      <h1>Grocery Lists:</h1>
      <form onSubmit={handleSubmit}>
        <button>New grocery list</button>
      </form>
      <div>
        {groceryLists ? (
          groceryLists.map((list) => <GroceryCard key={list._id} list={list} />)
        ) : (
          <p>No grocery lists</p>
        )}
      </div>
    </div>
  )
}

export default Recipes
