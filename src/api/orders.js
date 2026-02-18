import { api } from './client'

export const createOrder = async (payload) => {
  const { data } = await api.post('/orders', payload)
  return data
}

