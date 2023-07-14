import GroceryListCard from '../components/GroceryListCard'
import { useNavigate } from 'react-router-dom'

const Groceries = ({ groceries, handleSubmit, user }) => {
  const navigate = useNavigate()
  return user ? (
    <section name="Groceries" className="flex flex-col items-center mt-8">
      <h1 className="text-2xl m-2">Grocery Lists:</h1>
      <form onSubmit={handleSubmit} className="m-2">
        <button className="py-1 px-2 shadow-md rounded-xl button">
          New grocery list
        </button>
      </form>
      <div className="flex flex-wrap justify-center">
        {groceries ? (
          groceries
            .toSorted((a, b) => new Date(b.date) - new Date(a.date))
            .map((list) => (
              <GroceryListCard key={list._id} groceryList={list} />
            ))
        ) : (
          <p>No grocery lists</p>
        )}
      </div>
    </section>
  ) : (
    <div className="flex flex-col items-center">
      <h1>Oops! You must be signed in to do that!</h1>
      <button
        onClick={() => navigate('/login')}
        className="my-2 py-1 px-2 border rounded-xl"
      >
        Sign In
      </button>
    </div>
  )
}

export default Groceries
