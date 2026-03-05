import { Suspense } from 'react'

import { LoginForm } from '@/features/loginUser'
import { Logo } from '@/shared/ui/Logo'
import { LoginPanel } from '@/shared/ui/LoginPanel'

export default function LoginPage() {
  return (
    <LoginPanel>
      <Logo className="m-auto mb-5"/>
      <h1 className="text-[40px] text-center">Добро пожаловать!</h1>
      <p className="text-[18px] text-center text-gray6 text-shadow-inset mb-8">Пожалуйста, авторизируйтесь</p>
      <Suspense fallback={<div>Загрузка...</div>}>
        <LoginForm />
      </Suspense>
    </LoginPanel>
  )
}