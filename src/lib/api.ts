// src/api/api.ts
import axios from 'axios'
import Cookies from 'js-cookie'

// Define the base URL from your configuration
const baseURL = import.meta.env.VITE_BASE_API_URL

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Only attach the access token for requests that are NOT login or register
api.interceptors.request.use((config) => {
  // Normalize the URL path for comparison
  const url = config.url || ''
  const isAuthRoute =
    url.endsWith('/auth/login') || url.endsWith('/auth/register')

  if (!isAuthRoute) {
    const accessToken = Cookies.get('access_token')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
  }
  return config
})

export default api
