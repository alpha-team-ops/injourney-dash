'use client'

import { Sidebar } from '@/components/sidebar'
import { AppBar } from '@/components/appbar'
import { ComingSoon } from '@/components/coming-soon'
import { Images } from 'lucide-react'

export default function ImageGalleryPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppBar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <ComingSoon
              title="Image Gallery"
              description="Browse captured images and photos from visitor tracking. Explore visual records from Candi Borobudur."
              icon={<Images size={48} className="text-primary" />}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
