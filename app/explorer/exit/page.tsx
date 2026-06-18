'use client'

import { Sidebar } from '@/components/sidebar'
import { AppBar } from '@/components/appbar'
import { ComingSoon } from '@/components/coming-soon'
import { LogOut } from 'lucide-react'

export default function ExitRecordsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppBar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <ComingSoon
              title="Exit Records"
              description="Browse and analyze visitor exit data. Track when visitors leave Candi Borobudur and their exit patterns."
              icon={<LogOut size={48} className="text-primary" />}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
