'use client'

import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import { logout } from '@/lib/store/slices/authSlice'

const User: React.FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  
  const handleLogout = () => {
    dispatch(logout())
    router.push('/login')
  }

  return (
    <>
      <span className="font-bold">{user?.username}</span>
      <button
        onClick={handleLogout}
        className="px-3 py-1 text-gray-500 hover:text-[var(--color-primary)] disabled:opacity-30 disabled:hover:text-gray-500 cursor-pointer"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
    </>    
  )
}

export default User
