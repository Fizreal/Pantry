import Client from './api'

export const getIngredients = async () => {
  try {
    const response = await Client.get('/ingredient')
    return response
  } catch (error) {
    throw error
  }
}

export const searchIngredients = async (search) => {
  try {
    console.log(search)
    const response = await Client.get(`/ingredient/search?search=${search}`)
    console.log(response)
    return response
  } catch (error) {
    throw error
  }
}

export const searchSuggestions = async (search) => {
  try {
    const response = await Client.post(
      '/ingredient/suggestions?search=${search}'
    )
    return response
  } catch (error) {
    throw error
  }
}
