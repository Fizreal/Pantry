import Client from './api'

export const getRecipes = async () => {
  try {
    const response = await Client.get('/recipe')
    return response
  } catch (error) {
    throw error
  }
}

export const createRecipe = async (data) => {
  try {
    const response = await Client.post('/recipe/create', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteRecipe = async (recipeId) => {
  try {
    const response = await Client.delete(`/recipe/${recipeId}/delete`)
    return response
  } catch (error) {
    throw error
  }
}

export const addIngredient = async (recipeId, data) => {
  try {
    const response = await Client.put(`/recipe/${recipeId}/add`, data)
    return response
  } catch (error) {
    throw error
  }
}

export const removeIngredient = async (recipeId, ingredientId) => {
  try {
    const response = await Client.put(
      `/recipe/${recipeId}/remove/${ingredientId}`
    )
    return response
  } catch (error) {
    throw error
  }
}
