import type { BaseResponseDto } from '@/lib/types'

export interface LoginDto {
  username: string
  password: string
}

export interface ILoginResponseTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginResponseDto
  extends BaseResponseDto<ILoginResponseTokens> {}
