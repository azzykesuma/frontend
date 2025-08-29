import api from '@/lib/api'
import { BASE_CONFIG } from '@/lib/constant'

export const getEnemies = async () => {
  return api.get(`${BASE_CONFIG.baseURL}/api/enemy`)
}

export const getEnemyById = async (id: string) => {
  return api.get(`${BASE_CONFIG.baseURL}/api/enemies/${id}`)
}
