'use client'

import { Sidebar } from '@/components/sidebar'
import { AppBar } from '@/components/appbar'
import { motion } from 'framer-motion'
import { Plus, Minus, Navigation2, Users, AlertCircle, Zap } from 'lucide-react'
import { useState } from 'react'

export default function LiveHeatmapPage() {
  const [zoom, setZoom] = useState(100)
  const [selectedArea, setSelectedArea] = useState('all')

  const areas = [
    { id: 'all', name: 'All Areas', density: 65, color: 'from-green-500 via-yellow-500 to-red-500' },
    { id: 'safari', name: 'Safari Area', density: 85, color: 'from-red-500 to-red-600' },
    { id: 'gate', name: 'Main Gate', density: 72, color: 'from-yellow-500 to-orange-500' },
    { id: 'food', name: 'Food Court', density: 78, color: 'from-yellow-500 to-red-500' },
    { id: 'playground', name: 'Playground', density: 45, color: 'from-green-500 to-yellow-500' },
    { id: 'park', name: 'Bird Park', density: 52, color: 'from-green-500 via-lime-500 to-yellow-500' },
  ]

  const selectedAreaData = areas.find((a) => a.id === selectedArea) || areas[0]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppBar />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Live Heatmap</h2>
                  <p className="text-sm text-muted-foreground mt-1">Real-time visitor density visualization</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-green-400">Live</span>
                </div>
              </div>
            </motion.div>

            {/* Large Map - Full Width on Top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative bg-card border border-border rounded-lg overflow-hidden w-full h-96"
              style={{
                backgroundImage: 'url(/borobudur-map.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Map Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20" />

              {/* Heatmap Visualization */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-yellow-900/20 to-red-900/20" />

              {/* Density Points - Borobudur Areas */}
              <motion.div
                className="absolute w-32 h-32 bg-gradient-radial from-red-500/40 to-red-500/0 rounded-full"
                style={{ top: '30%', left: '40%' }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute w-24 h-24 bg-gradient-radial from-yellow-500/40 to-yellow-500/0 rounded-full"
                style={{ top: '55%', left: '25%' }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute w-20 h-20 bg-gradient-radial from-green-500/40 to-green-500/0 rounded-full"
                style={{ top: '65%', left: '65%' }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              />

              {/* Controls Overlay */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setZoom(Math.min(zoom + 10, 200))}
                  className="p-2 bg-card border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <Plus size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setZoom(Math.max(zoom - 10, 50))}
                  className="p-2 bg-card border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <Minus size={18} />
                </motion.button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 space-y-2 bg-card/80 backdrop-blur border border-border rounded-lg p-3">
                <p className="text-xs font-semibold text-foreground mb-2">Density Level</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded" />
                  <span className="text-xs text-muted-foreground">Low</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded" />
                  <span className="text-xs text-muted-foreground">Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded" />
                  <span className="text-xs text-muted-foreground">High</span>
                </div>
              </div>

              {/* Visitor Count */}
              <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur border border-border rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-foreground">2,345</p>
                <p className="text-xs text-muted-foreground">Visitors Now</p>
              </div>
            </motion.div>

            {/* Stats Grid Below Map */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={18} className="text-primary" />
                  <p className="text-xs text-muted-foreground">Peak Area</p>
                </div>
                <p className="text-lg font-bold text-foreground">Temple Main Area</p>
                <p className="text-xs text-red-400 mt-1">85% capacity</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={18} className="text-yellow-400" />
                  <p className="text-xs text-muted-foreground">Average Density</p>
                </div>
                <p className="text-lg font-bold text-foreground">{selectedAreaData.density}%</p>
                <p className="text-xs text-muted-foreground mt-1">Current</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={18} className="text-orange-400" />
                  <p className="text-xs text-muted-foreground">High Density</p>
                </div>
                <p className="text-lg font-bold text-foreground">3 Areas</p>
                <p className="text-xs text-orange-400 mt-1">Above 70%</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Content Area */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-3 space-y-4"
              >
                {/* Additional Info Sections */}
              </motion.div>

              {/* Right Sidebar - Area List */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-1 space-y-4"
              >
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-4">Area Density</h3>
                  <div className="space-y-3">
                    {areas.map((area, index) => (
                      <motion.button
                        key={area.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedArea(area.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          selectedArea === area.id
                            ? 'bg-primary/20 border-primary'
                            : 'border-border hover:bg-secondary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-sm text-foreground">{area.name}</p>
                          <span className="text-sm font-bold text-foreground">{area.density}%</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${area.density}%` }}
                            transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                            className={`h-full bg-gradient-to-r ${area.color} rounded-full`}
                          />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Alerts */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3">Alerts</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-xs font-medium text-red-400">Critical</p>
                      <p className="text-xs text-muted-foreground mt-1">Safari Area at 85%</p>
                    </div>
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-xs font-medium text-yellow-400">Warning</p>
                      <p className="text-xs text-muted-foreground mt-1">Food Court approaching 80%</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
