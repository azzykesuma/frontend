import api from '@/lib/api'
import { BASE_CONFIG } from '@/lib/constant'

export const getPlayerDetails = async () => {
  return api.get(`${BASE_CONFIG.baseURL}/api/player/get-player-details`)
}
