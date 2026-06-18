'use client'

import { Sidebar } from '@/components/sidebar'
import { AppBar } from '@/components/appbar'
import { ComingSoon } from '@/components/coming-soon'
import { User } from 'lucide-react'

export default function VisitorProfilePage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppBar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <ComingSoon
              title="Visitor Profile"
              description="Get detailed demographic and behavioral insights about your visitors. Understand visitor segments and preferences."
              icon={<User size={48} className="text-primary" />}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
