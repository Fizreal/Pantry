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
    const response = await Client.get('/groceryList/create')
    return response
  } catch (error) {
    throw error
  }
}

export const deleteRecipe = async (groceryId) => {
  try {
    const response = await Client.get(`/groceryList/${groceryIdId}/delete`)
    return response
  } catch (error) {
    throw error
  }
}

export const addRecipe = async (recipeId, data) => {
  try {
    const response = await Client.get(
      `/groceryList/${groceryId}/add/${recipeId}`
    )
    return response
  } catch (error) {
    throw error
  }
}

export const removeRecipe = async (groceryId, recipeId) => {
  try {
    const response = await Client.get(
      `/groceryList/${groceryId}/remove/${recipeId}`
    )
    return response
  } catch (error) {
    throw error
  }
}

export const compileGroceries = async (groceryId) => {
  try {
    const response = await Client.get(`/groceryList/${groceryId}/compile`)
    return response
  } catch (error) {
    throw error
  }
}
