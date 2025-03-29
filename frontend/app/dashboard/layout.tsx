'use client'

import { useAuth } from '@/hooks/useAuth'
// ... existing imports ...

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useAuth() // This will handle the redirection if user is not logged in

  return (
    <div>
      {/* Your dashboard layout components */}
      {children}
    </div>
  )
} 