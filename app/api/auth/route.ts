import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/shared/constants'
import type { AuthResponse, DummyJsonAuthResponse } from '@/entities/auth/auth.types'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Введите логин и пароль' },
        { status: 400 }
      )
    }

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30,
      }),
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json()
      let errorMsg = errorData.message || 'Ошибка авторизации'
      if (errorMsg === 'Invalid credentials')  {
        errorMsg = 'Неправильные логин или пароль'
      }
      return NextResponse.json(
        { error: errorMsg },
        { status: response.status }
      )
    }

    const data: DummyJsonAuthResponse = await response.json()
    const responseJson: AuthResponse = {
      success: true,
      user: {
        id: data.id,
        username: data.username,
      },
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }

    return NextResponse.json(responseJson)
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value as string
    const refreshToken = request.cookies.get('refreshToken')?.value as string

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Токен не найден' },
        { status: 401 }
      )
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      if (refreshToken) {
        const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken,
            expiresInMins: 30,
          }),
          credentials: 'include',
        })

        if (!refreshResponse.ok) {
          return NextResponse.json(
            { error: 'Токен истек' },
            { status: 401 }
          )
        }

        const refreshData: DummyJsonAuthResponse = await refreshResponse.json()

        const responseJson: AuthResponse = {
          success: true,
          user: {
            id: refreshData.id,
            username: refreshData.username,
          },
          accessToken: refreshData.accessToken,
          refreshToken: refreshData.refreshToken,
        }

        const response = NextResponse.json(responseJson)

        response.cookies.set('accessToken', refreshData.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 30 * 60,
        })

        response.cookies.set('refreshToken', refreshData.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 30 * 60,
        })

        return response
      }

      return NextResponse.json(
        { error: 'Токен истек' },
        { status: 401 }
      )
    }

    const userData: DummyJsonAuthResponse = await response.json()

    const responseJson: AuthResponse = {
      success: true,
      user: {
        id: userData.id,
        username: userData.username,
      },
      accessToken,
      refreshToken,
    }

    return NextResponse.json(responseJson)
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера'},
      { status: 500 }
    )
  }
}
