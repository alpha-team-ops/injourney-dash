'use client'

import { Sidebar } from '@/components/sidebar'
import { AppBar } from '@/components/appbar'
import { ComingSoon } from '@/components/coming-soon'
import { Navigation } from 'lucide-react'

export default function VisitorJourneyPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppBar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <ComingSoon
              title="Visitor Journey"
              description="Track the complete path visitors take through Candi Borobudur. Visualize entry points, routes, and exit patterns."
              icon={<Navigation size={48} className="text-primary" />}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
