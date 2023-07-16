import Client from './api'

export const getGroceryLists = async () => {
  try {
    const response = await Client.get('/groceryList')
    return response
  } catch (error) {
    throw error
  }
}

export const createGroceryList = async () => {
  try {
    const response = await Client.post('/groceryList/create')
    return response
  } catch (error) {
    throw error
  }
}

export const deleteGroceryList = async (groceryId) => {
  try {
    const response = await Client.delete(`/groceryList/${groceryId}`)
    return response
  } catch (error) {
    throw error
  }
}

export const addRecipe = async (groceryId, recipeId) => {
  try {
    const response = await Client.put(
      `/groceryList/${groceryId}/add/${recipeId}`
    )
    return response
  } catch (error) {
    throw error
  }
}

export const removeRecipe = async (groceryId, recipeId) => {
  try {
    const response = await Client.put(
      `/groceryList/${groceryId}/remove/${recipeId}`
    )
    return response
  } catch (error) {
    throw error
  }
}

export const compileGroceries = async (groceryId) => {
  try {
    const response = await Client.put(`/groceryList/${groceryId}/compile`)
    return response
  } catch (error) {
    throw error
  }
}

export const finishGroceryList = async (groceryId, data) => {
  try {
    const response = await Client.put(
      `/groceryList/${groceryId}/finished`,
      data
    )
    return response
  } catch (error) {
    throw error
  }
}

export const ingredientSuggestions = async (groceryId) => {
  try {
    const response = await Client.put(`/groceryList/${groceryId}/suggestions`)
    return response
  } catch (error) {
    throw error
  }
}

export const addSuggestion = async (groceryId, data) => {
  try {
    const response = await Client.put(
      `/groceryList/${groceryId}/addSuggestion`,
      data
    )
    return response
  } catch (error) {
    throw error
  }
}
