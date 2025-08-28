import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { BASE_CONFIG } from './constant'
import type { IJwtToken } from './types'

export const decodeJwt = () => {
  const userToken = Cookies.get(BASE_CONFIG.ACCESS_TOKEN)
  if (!userToken) {
    throw new Error('No token found')
  }
  return jwtDecode<IJwtToken>(userToken)
}
