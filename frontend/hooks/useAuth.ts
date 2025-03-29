import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { appClient } from '@/lib/client.ts/appClient'

export const useAuth = () => {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await appClient.verify()
        if (response.status === 200) {
          // User is authenticated
          return true
        }
        return false
      } catch (error) {
        return false
      }
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
      try {
        const response = await appClient.verify()
        return response.status === 200
      } catch (error) {
        return false
      }
    }
  }
} 