import { api } from './client'

export const fetchRestaurants = async (params = {}) => {
  const { data } = await api.get('/restaurants', { params })
  return data
}

export const fetchRestaurantById = async (id) => {
  const { data } = await api.get(`/restaurants/${id}`)
  return data
}

export const fetchMenuItemsForRestaurant = async (restaurantId) => {
  const { data } = await api.get('/menuItems', {
    params: { restaurantId },
  })
  return data
}

