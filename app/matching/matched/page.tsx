'use client'

import { Sidebar } from '@/components/sidebar'
import { AppBar } from '@/components/appbar'
import { motion } from 'framer-motion'
import { ChevronRight, Clock, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function MatchedVisitorsPage() {
  const [selectedVisitor, setSelectedVisitor] = useState<string | null>('VIS-090123')

  const visitors = [
    {
      id: 'VIS-090123',
      name: 'Visitor 001',
      confidence: 95,
      entry: { time: '18 May 2024 08:45:12', camera: 'Entry Camera' },
      exit: { time: '19 May 2024 11:32:45', camera: 'Exit Camera' },
      duration: '2h 47m',
      path: 'Main Gate → Danau → Food Court → Playground → Exit',
      areas: ['Main Gate', 'Danau', 'Food Court', 'Playground'],
    },
    {
      id: 'VIS-090124',
      name: 'Visitor 002',
      confidence: 92,
      entry: { time: '18 May 2024 08:48:16', camera: 'Entry Camera' },
      exit: { time: '19 May 2024 10:15:22', camera: 'Exit Camera' },
      duration: '1h 27m',
      path: 'Main Gate → Playground → Exit',
      areas: ['Main Gate', 'Playground'],
    },
    {
      id: 'VIS-090126',
      name: 'Visitor 003',
      confidence: 88,
      entry: { time: '18 May 2024 08:56:28', camera: 'Entry Camera' },
      exit: { time: '19 May 2024 13:45:10', camera: 'Exit Camera' },
      duration: '4h 48m',
      path: 'Main Gate → Danau → Safari Area → Food Court → Exit',
      areas: ['Main Gate', 'Danau', 'Safari Area', 'Food Court'],
    },
  ]

  const selectedData = visitors.find((v) => v.id === selectedVisitor)

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
              <h2 className="text-2xl font-bold text-foreground">Matched Visitors</h2>
              <p className="text-sm text-muted-foreground mt-1">Visitor tracking with confidence scores</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Panel - Visitor List */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-1 bg-card border border-border rounded-lg overflow-hidden"
              >
                <div className="p-4 border-b border-border bg-secondary/20">
                  <h3 className="font-semibold text-foreground">Visitors ({visitors.length})</h3>
                </div>
                <div className="space-y-2 p-4 max-h-96 overflow-y-auto">
                  {visitors.map((visitor) => (
                    <motion.button
                      key={visitor.id}
                      onClick={() => setSelectedVisitor(visitor.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedVisitor === visitor.id
                          ? 'bg-primary/20 border-primary text-foreground'
                          : 'border-border hover:bg-secondary/50 text-foreground'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-sm">{visitor.name}</p>
                          <p className="text-xs text-muted-foreground">{visitor.id}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-green-400">{visitor.confidence}%</div>
                          <p className="text-xs text-muted-foreground">Confidence</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{visitor.duration} stay</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Right Panel - Visitor Details */}
              {selectedData && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="lg:col-span-2 space-y-6"
                >
                  {/* Detail Header */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{selectedData.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedData.id}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-green-400">{selectedData.confidence}%</div>
                        <p className="text-xs text-muted-foreground">Match Confidence</p>
                      </div>
                    </div>

                    {/* Entry/Exit Images */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Entry</p>
                        <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl mb-2">📷</div>
                            <p className="text-xs text-muted-foreground">Entry Camera</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{selectedData.entry.time}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Exit</p>
                        <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl mb-2">📷</div>
                            <p className="text-xs text-muted-foreground">Exit Camera</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{selectedData.exit.time}</p>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Total Duration</p>
                        <p className="text-lg font-bold text-foreground flex items-center gap-2">
                          <Clock size={18} />
                          {selectedData.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Areas Visited</p>
                        <p className="text-lg font-bold text-foreground">{selectedData.areas.length}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Entry Time</p>
                        <p className="text-sm text-foreground">{selectedData.entry.time.split(' ')[4]}</p>
                      </div>
                    </div>
                  </div>

                  {/* Journey Path */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h4 className="font-semibold text-foreground mb-4">Visitor Journey</h4>
                    <p className="text-sm text-foreground mb-4">{selectedData.path}</p>

                    {/* Area Flow */}
                    <div className="flex items-center gap-3 flex-wrap">
                      {selectedData.areas.map((area, index) => (
                        <motion.div
                          key={area}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="px-3 py-2 bg-secondary rounded-lg text-sm font-medium text-foreground">
                            <MapPin size={14} className="inline mr-2" />
                            {area}
                          </div>
                          {index < selectedData.areas.length - 1 && (
                            <ChevronRight size={18} className="text-muted-foreground" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Visitor Stats */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h4 className="font-semibold text-foreground mb-4">Visit Statistics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary/20 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Entry Camera</p>
                        <p className="text-sm font-medium text-foreground">{selectedData.entry.camera}</p>
                      </div>
                      <div className="p-4 bg-secondary/20 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Exit Camera</p>
                        <p className="text-sm font-medium text-foreground">{selectedData.exit.camera}</p>
                      </div>
                      <div className="p-4 bg-secondary/20 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Entry Date</p>
                        <p className="text-sm font-medium text-foreground">{selectedData.entry.time.split(' ').slice(0, 3).join(' ')}</p>
                      </div>
                      <div className="p-4 bg-secondary/20 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Exit Date</p>
                        <p className="text-sm font-medium text-foreground">{selectedData.exit.time.split(' ').slice(0, 3).join(' ')}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
