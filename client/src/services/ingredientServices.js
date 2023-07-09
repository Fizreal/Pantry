import Client from './api'

export const getIngredients = async () => {
  try {
    const response = Client.get('/')
  } catch (error) {
    throw error
  }
}

export const searchIngredients = async (search) => {
  try {
    const response = Client.get('/search', search)
    return response
  } catch (error) {
    throw error
  }
}

export const searchSuggestions = async (search) => {
  try {
    const response = Client.get('/suggestions', search)
    return response
  } catch (error) {
    throw error
  }
}
