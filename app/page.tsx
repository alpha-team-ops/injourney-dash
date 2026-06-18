'use client'

import { Sidebar } from '@/components/sidebar'
import { AppBar } from '@/components/appbar'
import { motion } from 'framer-motion'
import { Clock, Users, Flame, User, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react'

export default function Dashboard() {
  const kpiCards = [
    {
      icon: Clock,
      label: 'Average Length of Visit',
      value: '2h 15m',
      trend: '+12.5% vs last week',
      isTrendUp: true,
      color: 'bg-green-500/20 text-green-600',
      trendColor: 'text-green-600',
      miniChart: [20, 25, 22, 28, 26, 30, 32, 28, 35, 38, 36, 40],
    },
    {
      icon: Users,
      label: 'Total Visitors',
      value: '12,450',
      trend: '+8.3% vs last week',
      isTrendUp: true,
      color: 'bg-blue-500/20 text-blue-600',
      trendColor: 'text-blue-600',
      miniChart: [30, 35, 32, 40, 38, 42, 45, 40, 48, 50, 48, 55],
    },
    {
      icon: Flame,
      label: 'Peak Length of Visit',
      value: '4h 32m',
      trend: '+6.7% vs last week',
      isTrendUp: true,
      color: 'bg-purple-500/20 text-purple-600',
      trendColor: 'text-purple-600',
      miniChart: [25, 30, 28, 35, 32, 38, 42, 38, 45, 48, 46, 50],
    },
    {
      icon: User,
      label: 'Short Stay Rate (< 30m)',
      value: '18%',
      trend: '-2.1% vs last week',
      isTrendUp: false,
      color: 'bg-orange-500/20 text-orange-600',
      trendColor: 'text-orange-600',
      miniChart: [35, 32, 33, 30, 28, 25, 22, 26, 20, 18, 19, 15],
    },
  ]

  const visitorJourney = [
    { place: 'Main Gate', percentage: 100, visitors: 12450 },
    { place: 'Danau', percentage: 76, visitors: 9462 },
    { place: 'Food Court', percentage: 52, visitors: 6453 },
    { place: 'Playground', percentage: 31, visitors: 3856 },
    { place: 'Exit Gate', percentage: 100, visitors: 12450 },
  ]

  const topAreas = [
    { name: 'Food Court', duration: '3h 15m', color: 'bg-green-500' },
    { name: 'Danau', duration: '2h 50m', color: 'bg-blue-500' },
    { name: 'Safari Area', duration: '2h 35m', color: 'bg-purple-500' },
    { name: 'Playground', duration: '2h 10m', color: 'bg-yellow-500' },
    { name: 'Bird Park', duration: '1h 40m', color: 'bg-red-500' },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppBar />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-start justify-between"
            >
              <div>
                <h1 className="text-3xl font-bold text-foreground">Executive Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">Overview of Length of Visit performance</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:bg-secondary/50 rounded-lg transition-colors">
                View Full Report <ExternalLink size={16} />
              </button>
            </motion.div>

            {/* KPI Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {kpiCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${card.color}`}>
                      <card.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">{card.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{card.value}</p>
                    </div>
                  </div>

                  {/* Mini Chart */}
                  <div className="flex items-end justify-between gap-1 h-10 mb-3 px-1">
                    {card.miniChart.map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.03 }}
                        className={`flex-1 rounded-t-sm ${card.color.split(' ')[0]}`}
                      />
                    ))}
                  </div>

                  {/* Trend */}
                  <div className="flex items-center gap-1">
                    {card.isTrendUp ? (
                      <TrendingUp size={14} className={card.trendColor} />
                    ) : (
                      <TrendingDown size={14} className={card.trendColor} />
                    )}
                    <span className={`text-xs ${card.trendColor}`}>{card.trend}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Charts Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Length of Visit Trend */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Length of Visit Trend</h3>
                  <div className="flex gap-2">
                    {['Daily', 'Weekly', 'Monthly'].map(period => (
                      <button
                        key={period}
                        className={`px-3 py-1 text-sm rounded ${
                          period === 'Daily'
                            ? 'bg-blue-500/20 text-blue-600'
                            : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-secondary/50">
                  <span className="text-xs text-muted-foreground">21 May 2024</span>
                  <span className="text-sm font-semibold text-foreground">Average LoV</span>
                  <span className="text-lg font-bold text-blue-600">2h 45m</span>
                </div>

                <div className="h-48 flex items-end justify-between gap-2 px-2">
                  {[35, 42, 38, 45, 40, 48, 52, 48, 55, 60, 58, 65].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.05 }}
                      className="flex-1 bg-blue-500 rounded-t opacity-80 hover:opacity-100 transition-opacity"
                    />
                  ))}
                </div>

                <div className="flex justify-between text-xs text-muted-foreground mt-4 px-2">
                  <span>18 May</span>
                  <span>19 May</span>
                  <span>20 May</span>
                  <span>21 May</span>
                  <span>22 May</span>
                  <span>23 May</span>
                  <span>24 May</span>
                </div>
              </div>

              {/* Duration Distribution */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Duration Distribution</h3>
                
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-40 h-40">
                    {/* Donut Chart SVG */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="56.5 314" strokeDashoffset="0" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#06b6d4" strokeWidth="12" strokeDasharray="69.2 314" strokeDashoffset="-56.5" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#8b5cf6" strokeWidth="12" strokeDasharray="75.4 314" strokeDashoffset="-125.7" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="72.4 314" strokeDashoffset="-201.1" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#ef4444" strokeWidth="12" strokeDasharray="40.5 314" strokeDashoffset="-273.5" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-xs text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold text-foreground">12,450</p>
                      <p className="text-xs text-muted-foreground">Visitors</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { label: '< 30 minutes', color: 'bg-blue-500', percentage: 18, count: '(2,241)' },
                    { label: '30-60 minutes', color: 'bg-cyan-500', percentage: 22, count: '(2,739)' },
                    { label: '1-2 hours', color: 'bg-purple-500', percentage: 24, count: '(2,988)' },
                    { label: '2-4 hours', color: 'bg-yellow-500', percentage: 23, count: '(2,864)' },
                    { label: '> 4 hours', color: 'bg-red-500', percentage: 13, count: '(1,618)' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-sm">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-muted-foreground flex-1">{item.label}</span>
                      <span className="font-medium text-foreground">{item.percentage}%</span>
                      <span className="text-muted-foreground">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Bottom Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Visitor Journey */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Visitor Journey (Top Flow)</h3>
                
                <div className="flex items-center justify-between">
                  {visitorJourney.map((item, i) => (
                    <div key={item.place} className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-600">
                        {i === 0 && '🏢'}
                        {i === 1 && '🌊'}
                        {i === 2 && '🍽️'}
                        {i === 3 && '🎪'}
                        {i === 4 && '→'}
                      </div>
                      <p className="text-sm font-semibold text-foreground">{item.percentage}%</p>
                      <p className="text-xs text-muted-foreground text-center">{item.place}</p>
                      <p className="text-sm font-bold text-foreground">{item.visitors.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Areas */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Top Areas by Average Length of Visit</h3>
                
                <div className="space-y-4">
                  {topAreas.map((area, i) => (
                    <motion.div
                      key={area.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{area.name}</span>
                        <span className="text-sm font-semibold text-foreground">{area.duration}</span>
                      </div>
                      <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${100 - i * 15}%` }}
                          transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                          className={`h-full ${area.color} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
