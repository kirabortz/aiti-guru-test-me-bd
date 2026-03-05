export type AuthUser = {
  id: number
  username: string
}

export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

export type LoginRequest = {
  username: string
  password: string
}

export type AuthResponse = {
  success: boolean
  user: AuthUser
  accessToken: string
  refreshToken: string
}

export type AuthError = {
  error: string
}

export type DummyJsonAuthResponse = {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  image: string
  accessToken: string
  refreshToken: string
}

export type DummyJsonError = {
  message: string
}
