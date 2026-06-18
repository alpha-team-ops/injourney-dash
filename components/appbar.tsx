'use client'

import { useState } from 'react'
import { Bell, Settings, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export function AppBar() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedSite, setSelectedSite] = useState('Borobudur')

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-20 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60"
    >
      <div className="flex items-center justify-between h-16 px-4 md:px-6 gap-4">
        {/* Left - Title & Site Selector */}
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-foreground">Visitor Analytics</h1>
          
          {/* Site Selector */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/30 transition-colors cursor-pointer">
            <MapPin size={16} className="text-primary" />
            <select
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
              className="bg-transparent text-sm text-foreground outline-none cursor-pointer"
            >
              <option>Borobudur</option>
              <option>Prambanan</option>
              <option>Candi Sewu</option>
            </select>
          </div>
        </div>

        {/* Right - Controls */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <Bell size={20} className="text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </motion.button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-xl p-3 space-y-2"
              >
                <p className="text-xs font-semibold text-foreground uppercase">Alerts</p>
                <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
                  <p className="text-xs font-medium text-foreground">High Density</p>
                  <p className="text-xs text-muted-foreground">Area A: 85% capacity</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <Settings size={20} className="text-foreground" />
          </motion.button>

          {/* User Profile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
              AD
            </div>
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}
