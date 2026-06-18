'use client'

import { Sidebar } from '@/components/sidebar'
import { AppBar } from '@/components/appbar'
import { ComingSoon } from '@/components/coming-soon'
import { MapPin } from 'lucide-react'

export default function AreaPerformancePage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppBar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <ComingSoon
              title="Area Performance"
              description="Compare performance metrics across different areas of Candi Borobudur. Get insights on visitor engagement and capacity."
              icon={<MapPin size={48} className="text-primary" />}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
