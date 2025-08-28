import Cookies from 'js-cookie'
import api from '@/lib/api'
import { BASE_CONFIG } from '@/lib/constant'
import { decodeJwt } from '@/lib/cookies'

export const getWeapon = async () => {
  return api.get(`${BASE_CONFIG.baseURL}/api/weapon`)
}

export function selectWeapon(weaponId: string) {
  const token = Cookies.get(BASE_CONFIG.ACCESS_TOKEN)
  if (!token) {
    throw new Error('No token found')
  }
  const userId = decodeJwt().id

  return api.post(`${BASE_CONFIG.baseURL}/api/player/select-weapon`, {
    weaponId: weaponId,
    playerId: userId,
  })
}
