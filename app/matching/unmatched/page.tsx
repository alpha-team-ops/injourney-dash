'use client'

import { Sidebar } from '@/components/sidebar'
import { AppBar } from '@/components/appbar'
import { ComingSoon } from '@/components/coming-soon'
import { Users } from 'lucide-react'

export default function UnmatchedVisitorsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppBar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <ComingSoon
              title="Unmatched Visitors"
              description="View and manage visitor records that haven't been matched with identification data. Work on visitor verification."
              icon={<Users size={48} className="text-primary" />}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
