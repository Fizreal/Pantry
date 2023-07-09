import Client from './api'

export const getRecipes = async () => {
  try {
    const response = Client.get('/recipe')
    return response
  } catch (error) {
    throw error
  }
}

export const createRecipe = async (data) => {
  try {
    const response = Client.get('/recipe/create', data)
    return response
  } catch (error) {
    throw error
  }
}

export const deleteRecipe = async (recipeId) => {
  try {
    const response = Client.get(`/recipe/${recipeId}/delete`)
    return response
  } catch (error) {
    throw error
  }
}

export const addIngredient = async (recipeId, data) => {
  try {
    const response = Client.get(`/recipe/${recipeId}/add`, data)
    return response
  } catch (error) {
    throw error
  }
}

export const removeIngredient = async (recipeId, ingredientId) => {
  try {
    const response = Client.get(`/recipe/${recipeId}/remove/${ingredientId}`)
    return response
  } catch (error) {
    throw error
  }
}
