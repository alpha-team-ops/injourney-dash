'use client'

import { Sidebar } from '@/components/sidebar'
import { AppBar } from '@/components/appbar'
import { motion } from 'framer-motion'
import { Search, Filter, Download, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'

export default function EntryRecordsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const entryRecords = [
    {
      id: 'VIS-090123',
      camera: 'Main Gate',
      area: 'Gate A',
      time: '18 May 2024 08:45:12',
      image: '📷',
      matchStatus: 'Matched',
      visitor: 'Visitor 001',
    },
    {
      id: 'VIS-090124',
      camera: 'Main Gate',
      area: 'Gate A',
      time: '18 May 2024 08:48:16',
      image: '📷',
      matchStatus: 'Matched',
      visitor: 'Visitor 002',
    },
    {
      id: 'VIS-090125',
      camera: 'Main Gate',
      area: 'Gate A',
      time: '18 May 2024 08:52:33',
      image: '📷',
      matchStatus: 'Unmatched',
      visitor: 'Unknown',
    },
    {
      id: 'VIS-090126',
      camera: 'Safari Area',
      area: 'Gate B',
      time: '18 May 2024 08:56:28',
      image: '📷',
      matchStatus: 'Matched',
      visitor: 'Visitor 003',
    },
    {
      id: 'VIS-090127',
      camera: 'Food Court',
      area: 'Food Court',
      time: '18 May 2024 09:12:45',
      image: '📷',
      matchStatus: 'Matched',
      visitor: 'Visitor 001',
    },
  ]

  const filteredRecords = entryRecords.filter((record) =>
    record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.visitor.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)

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
                  <h2 className="text-2xl font-bold text-foreground">Data Explorer</h2>
                  <p className="text-sm text-muted-foreground mt-1">Entry Records</p>
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

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex gap-3 items-center flex-wrap"
            >
              {/* Search */}
              <div className="flex-1 min-w-64 flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
                <Search size={18} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search visitor ID, name..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
                />
              </div>

              {/* Filter */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <Filter size={18} />
                <span className="text-sm">Filters</span>
              </motion.button>
            </motion.div>

            {/* Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-border rounded-lg overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Visitor ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Camera</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Area</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Image</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Match Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Visitor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record, index) => (
                      <motion.tr
                        key={record.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b border-border hover:bg-secondary/20 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 text-sm text-foreground font-medium">{record.id}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{record.camera}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{record.area}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{record.time}</td>
                        <td className="px-6 py-4 text-sm">
                          <button className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
                            <ImageIcon size={16} />
                            View
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              record.matchStatus === 'Matched'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {record.matchStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">{record.visitor}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-secondary/10">
                <p className="text-sm text-muted-foreground">
                  Showing 1 to 10 of {filteredRecords.length} entries
                </p>
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-border hover:bg-secondary/50 disabled:opacity-50 transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === i + 1
                          ? 'bg-primary text-primary-foreground'
                          : 'border border-border hover:bg-secondary/50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-border hover:bg-secondary/50 disabled:opacity-50 transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
