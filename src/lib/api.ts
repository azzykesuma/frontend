// src/api/api.ts
import axios from 'axios'
import Cookies from 'js-cookie'
import { BASE_CONFIG } from './constant'

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
    const accessToken = Cookies.get(BASE_CONFIG.ACCESS_TOKEN)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    // If error response is 401 (invalid/expired token) and we haven't retried yet
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === 'Invalid or expired token'
    ) {
      originalRequest._retry = true
      try {
        // Dynamically import refreshToken to avoid circular dependency
        const { refreshToken } = await import('@/api/refreshToken')
        const data = await refreshToken()
        if (data && data.data.accessToken) {
          Cookies.set(BASE_CONFIG.ACCESS_TOKEN, data.data.accessToken)
          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

export default api
