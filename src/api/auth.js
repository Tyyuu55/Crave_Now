import { api } from './client'

export const signup = async (payload) => {
  const { data } = await api.post('/users', payload)
  return data
}

export const login = async ({ email, password }) => {
  const { data } = await api.get('/users', {
    params: { email, password },
  })

  if (!data || data.length === 0) {
    throw new Error('Invalid email or password')
  }

  return data[0]
}

