import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { appClient } from '@/lib/client.ts/appClient'

export const useAuth = () => {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const response = await appClient.verify()
      if (response.status === 200) {
        return true
      }
      return false
    }

    const handleAuth = async () => {
      const isAuthenticated = await checkAuth()
      const isLoginPage = window.location.pathname === '/login'
      const isDashboardPage = window.location.pathname.startsWith('/dashboard')

      if (isAuthenticated && isLoginPage) {
        router.push('/dashboard')
      } else if (!isAuthenticated && isDashboardPage) {
        router.push('/login')
      }
    }

    handleAuth()
  }, [router])

  return {
    verify: async () => {
      const response = await appClient.verify()
      return response.status === 200
    }
  }
} 