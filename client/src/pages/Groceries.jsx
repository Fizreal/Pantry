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
      <div className="flex flex-wrap justify-center w-80 md:w-[700px] lg:w-[1020px]">
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
    <section name="Unauthorized" className="flex flex-col items-center mt-8">
      <h1 className="">Oops! You must be signed in to do that!</h1>
      <button
        onClick={() => navigate('/login')}
        className="my-2 py-1 px-2 button rounded-xl"
      >
        Sign In
      </button>
    </section>
  )
}

export default Groceries
