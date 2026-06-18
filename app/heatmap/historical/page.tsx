'use client'

import { Sidebar } from '@/components/sidebar'
import { AppBar } from '@/components/appbar'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Calendar, Clock, Download } from 'lucide-react'
import { useState } from 'react'

export default function HistoricalHeatmapPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(8)
  const [selectedDate, setSelectedDate] = useState('2024-05-21')

  const timeRange = Array.from({ length: 11 }, (_, i) => `${i + 8}:00`)

  const getDensityByTime = (hour: number) => {
    const densities = [35, 45, 52, 65, 72, 78, 82, 75, 68, 55, 42]
    return densities[hour - 8] || 0
  }

  const currentDensity = getDensityByTime(currentTime)

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
                  <h2 className="text-2xl font-bold text-foreground">Historical Heatmap</h2>
                  <p className="text-sm text-muted-foreground mt-1">Time-series visitor density analysis</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Download size={18} />
                  Export
                </motion.button>
              </div>
            </motion.div>

            {/* Large Map - Full Width on Top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-border rounded-lg overflow-hidden w-full h-96 relative"
              style={{
                backgroundImage: 'url(/borobudur-map.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Map Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20" />

              {/* Heatmap Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-yellow-900/20 to-red-900/20" />

              {/* Animated Density Points - Borobudur Areas */}
              <motion.div
                className={`absolute w-32 h-32 rounded-full blur-3xl`}
                style={{
                  top: '30%',
                  left: '40%',
                  background: `radial-gradient(circle, rgba(${currentDensity > 70 ? '239, 68, 68' : currentDensity > 40 ? '245, 158, 11' : '16, 185, 129'}, 0.4) 0%, transparent 70%)`,
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute w-24 h-24 rounded-full blur-2xl bg-gradient-radial from-yellow-500/30 to-yellow-500/0"
                style={{ top: '55%', left: '25%' }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute w-20 h-20 rounded-full blur-xl bg-gradient-radial from-green-500/30 to-green-500/0"
                style={{ top: '65%', left: '65%' }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              />

              {/* Playback Info Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-card/80 backdrop-blur border border-border rounded-lg p-6 text-center">
                  <p className="text-4xl font-bold text-foreground">{currentTime}:00</p>
                  <p className="text-sm text-muted-foreground mt-2">{selectedDate}</p>
                  <p className="text-lg font-semibold text-foreground mt-4">{currentDensity}% Density</p>
                  <p className={`text-sm mt-2 ${currentDensity > 70 ? 'text-red-400' : currentDensity > 40 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {currentDensity > 70 ? 'High' : currentDensity > 40 ? 'Medium' : 'Low'}
                  </p>
                </div>
              </div>

              {/* Time Legend */}
              <div className="absolute bottom-4 left-4 space-y-2 bg-card/80 backdrop-blur border border-border rounded-lg p-3">
                <p className="text-xs font-semibold text-foreground mb-2">Density Level</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-xs text-muted-foreground">Low (&lt;40%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-xs text-muted-foreground">Medium (40-70%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-xs text-muted-foreground">High (&gt;70%)</span>
                  </div>
                </div>
              </div>

              {/* Visitor Count */}
              <div className="absolute top-4 right-4 bg-card/80 backdrop-blur border border-border rounded-lg p-4 text-right">
                <p className="text-3xl font-bold text-foreground">{Math.round(currentDensity * 30)}</p>
                <p className="text-xs text-muted-foreground">Visitors at {currentTime}:00</p>
              </div>
            </motion.div>

            {/* Timeline Controls and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-3 space-y-4"
              >
                {/* Timeline Controls */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-foreground">Playback Controls</p>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentTime(8)}
                        className="p-2 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        <RotateCcw size={18} />
                      </motion.button>
                    </div>
                  </div>

                  {/* Time Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{currentTime}:00</span>
                      <span>18:00</span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="18"
                      value={currentTime}
                      onChange={(e) => setCurrentTime(parseInt(e.target.value))}
                      className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  {/* Time Steps */}
                  <div className="grid grid-cols-11 gap-1">
                    {timeRange.map((time, index) => (
                      <motion.button
                        key={time}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setCurrentTime(8 + index)}
                        className={`py-2 rounded text-xs font-medium transition-all ${
                          currentTime === 8 + index
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                        }`}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Density Chart */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Hourly Density Trend</h3>
                  <div className="flex items-end justify-around gap-2 h-32 px-4">
                    {Array.from({ length: 11 }, (_, i) => {
                      const density = getDensityByTime(i + 8)
                      return (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${(density / 82) * 100}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05 }}
                          className={`flex-1 rounded-t-lg cursor-pointer hover:opacity-80 transition-opacity ${
                            currentTime === i + 8
                              ? 'bg-primary shadow-lg shadow-primary/50'
                              : density > 70
                                ? 'bg-red-500/60'
                                : density > 40
                                  ? 'bg-yellow-500/60'
                                  : 'bg-green-500/60'
                          }`}
                          onClick={() => setCurrentTime(i + 8)}
                          whileHover={{ scaleY: 1.1 }}
                        />
                      )
                    })}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>08:00</span>
                    <span>18:00</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-1 space-y-4"
              >
                {/* Date/Time Settings */}
                <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-foreground mb-3">Settings</h3>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Date</label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-secondary/20 rounded-lg border border-border">
                      <Calendar size={16} className="text-primary" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-sm text-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Time</label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-secondary/20 rounded-lg border border-border">
                      <Clock size={16} className="text-primary" />
                      <select className="flex-1 bg-transparent outline-none text-sm text-foreground">
                        {timeRange.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-foreground mb-3">Day Statistics</h3>

                  <div className="space-y-2">
                    <div className="p-3 bg-secondary/20 rounded-lg">
                      <p className="text-xs text-muted-foreground">Peak Hour</p>
                      <p className="text-lg font-bold text-foreground">14:00</p>
                      <p className="text-xs text-red-400 mt-1">82% density</p>
                    </div>
                    <div className="p-3 bg-secondary/20 rounded-lg">
                      <p className="text-xs text-muted-foreground">Avg Density</p>
                      <p className="text-lg font-bold text-foreground">61%</p>
                      <p className="text-xs text-muted-foreground mt-1">Throughout day</p>
                    </div>
                    <div className="p-3 bg-secondary/20 rounded-lg">
                      <p className="text-xs text-muted-foreground">Total Visitors</p>
                      <p className="text-lg font-bold text-foreground">8,450</p>
                      <p className="text-xs text-muted-foreground mt-1">Recorded today</p>
                    </div>
                  </div>
                </div>

                {/* Areas */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3">Top Areas</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Food Court', value: 78 },
                      { name: 'Safari Area', value: 72 },
                      { name: 'Main Gate', value: 68 },
                    ].map((area, i) => (
                      <motion.div
                        key={area.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-2 bg-secondary/20 rounded-lg"
                      >
                        <div className="flex justify-between mb-1">
                          <p className="text-xs font-medium text-foreground">{area.name}</p>
                          <p className="text-xs font-bold text-foreground">{area.value}%</p>
                        </div>
                        <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${area.value}%` }}
                            transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                            className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                          />
                        </div>
                      </motion.div>
                    ))}
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
