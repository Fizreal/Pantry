const RecipeListCard = ({ recipe, handleSubmit }) => {
  return (
    <div className="p-3 border m-2 w-80 rounded-lg text-center card shadow">
      <h2 className="text-lg">{recipe.name}</h2>
      <p>Category: {recipe.category}</p>
      <form onSubmit={(e) => handleSubmit(e, recipe._id)}>
        <button className="my-2 py-1 px-2 border rounded-xl">
          Add to grocery list
        </button>
      </form>
    </div>
  )
}

export default RecipeListCard
