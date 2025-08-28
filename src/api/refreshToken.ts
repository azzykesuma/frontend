import Cookies from 'js-cookie'
import { BASE_CONFIG } from '@/lib/constant'

export const refreshToken = async () => {
  console.log('jalan')
  const response = await fetch(
    `${BASE_CONFIG.baseURL}/api/auth/refresh-token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: Cookies.get(BASE_CONFIG.REFRESH_TOKEN),
      }),
    },
  )
  return response.json()
}
