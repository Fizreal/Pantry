import GroceryCard from '../components/GroceryCard'

const Recipes = ({ groceries, handleSubmit }) => {
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
