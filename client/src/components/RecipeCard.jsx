const RecipeListCard = ({ recipe, handleSubmit }) => {
  return (
    <div className="p-3 border m-2 w-80 rounded-lg text-center">
      <h2 className="text-lg">{recipe.name}</h2>
      <p>Category: {recipe.category}</p>
      <form onSubmit={(e) => handleSubmit(e, recipe._id)}>
        <button>Add to grocery list</button>
      </form>
    </div>
  )
}

export default RecipeListCard
