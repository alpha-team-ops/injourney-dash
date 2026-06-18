'use client'

import { Sidebar } from '@/components/sidebar'
import { AppBar } from '@/components/appbar'
import { ComingSoon } from '@/components/coming-soon'
import { Settings } from 'lucide-react'

export default function AdminPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppBar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <ComingSoon
              title="Administration"
              description="Manage system settings, user access, and configuration options for the VisitorMap platform."
              icon={<Settings size={48} className="text-primary" />}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
