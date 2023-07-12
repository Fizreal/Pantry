import GroceryListCard from '../components/GroceryListCard'

const Groceries = ({ groceries, handleSubmit }) => {
  return (
    <section name="groceries" className="flex flex-col items-center w-80">
      <form onSubmit={handleSubmit} className="m-2">
        <button className="p-2 border rounded-xl">New grocery list</button>
      </form>
      <h1 className="text-xl m-2">Grocery Lists:</h1>
      <div>
        {groceries ? (
          groceries.map((list) => (
            <GroceryListCard key={list._id} groceryList={list} />
          ))
        ) : (
          <p>No grocery lists</p>
        )}
      </div>
    </section>
  )
}

export default Groceries
