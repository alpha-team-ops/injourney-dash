'use client'

import { Sidebar } from '@/components/sidebar'
import { AppBar } from '@/components/appbar'
import { ComingSoon } from '@/components/coming-soon'
import { FileText } from 'lucide-react'

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppBar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <ComingSoon
              title="Reports"
              description="Generate and download comprehensive reports about visitor data, trends, and insights from Candi Borobudur."
              icon={<FileText size={48} className="text-primary" />}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
