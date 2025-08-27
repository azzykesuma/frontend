export type StatusCode = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500

export interface BaseResponseDto<T> {
  data?: T
  statusCode: StatusCode
  success: boolean
  message?: string
  error?: string
}
