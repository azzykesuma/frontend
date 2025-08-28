import type { JwtPayload } from 'jwt-decode'

export type StatusCode = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500

export interface BaseResponseDto<T> {
  data?: T
  statusCode: StatusCode
  success: boolean
  message?: string
  error?: string
}

export interface IMasterClass {
  class_id: number
  class_name: string
  class_base_dex: number
  class_base_int: number
  class_base_hp: number
  class_base_mp: number
  class_base_str: number
  class_main_stat: string
}

export interface IJwtToken extends JwtPayload {
  id: string
  username: string
  iat: number
  exp: number
}
