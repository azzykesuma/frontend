import Cookies from 'js-cookie'
import api from '@/lib/api'
import { BASE_CONFIG } from '@/lib/constant'
import { decodeJwt } from '@/lib/cookies'

export function getMasterClass() {
  return api.get(`${BASE_CONFIG.baseURL}/api/master-class`)
}

export function getMasterClassById(id: string) {
  return api.get(`${BASE_CONFIG.baseURL}/master-class/${id}`)
}

export function createMasterClass(data: any) {
  return api.post(`${BASE_CONFIG.baseURL}/master-class`, data)
}

export function selectMasterClass(classId: string) {
  const token = Cookies.get(BASE_CONFIG.ACCESS_TOKEN)
  if (!token) {
    throw new Error('No token found')
  }
  const userId = decodeJwt().id

  return api.post(`${BASE_CONFIG.baseURL}/api/master-class/select`, {
    class_id: classId,
    user_id: userId,
  })
}
