'use client'

import { Sidebar } from '@/components/sidebar'
import { AppBar } from '@/components/appbar'
import { ComingSoon } from '@/components/coming-soon'
import { Clock } from 'lucide-react'

export default function LengthOfVisitPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppBar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <ComingSoon
              title="Length of Visit Analytics"
              description="Analyze how long visitors spend in different areas of Candi Borobudur. Track visit duration trends and patterns."
              icon={<Clock size={48} className="text-primary" />}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
