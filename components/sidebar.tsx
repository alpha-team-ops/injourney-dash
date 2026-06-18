'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Database,
  Flame,
  FileText,
  Settings,
  ChevronDown,
  Menu,
  X,
  Clock,
  Navigation,
  MapPin,
  User,
  Images,
  Map,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  label: string
  href?: string
  icon?: React.ReactNode
  submenu?: NavItem[]
}

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      href: '/',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'Analytics',
      icon: <BarChart3 size={20} />,
      submenu: [
        { label: 'Length of Visit', href: '/analytics/length-of-visit', icon: <Clock size={18} /> },
        { label: 'Visitor Journey', href: '/analytics/visitor-journey', icon: <Navigation size={18} /> },
        { label: 'Area Performance', href: '/analytics/area-performance', icon: <MapPin size={18} /> },
        { label: 'Visitor Profile', href: '/analytics/visitor-profile', icon: <User size={18} /> },
      ],
    },
    {
      label: 'Visitor Matching',
      icon: <Users size={20} />,
      submenu: [
        { label: 'Matched Visitors', href: '/matching/matched' },
        { label: 'Unmatched Visitors', href: '/matching/unmatched' },
      ],
    },
    {
      label: 'Data Explorer',
      icon: <Database size={20} />,
      submenu: [
        { label: 'Entry Records', href: '/explorer/entry' },
        { label: 'Exit Records', href: '/explorer/exit' },
        { label: 'Image Gallery', href: '/explorer/gallery', icon: <Images size={18} /> },
      ],
    },
    {
      label: 'Heatmap',
      icon: <Flame size={20} />,
      submenu: [
        { label: 'Live Heatmap', href: '/heatmap/live' },
        { label: 'Historical', href: '/heatmap/historical' },
      ],
    },
    {
      label: 'Reports',
      href: '/reports',
      icon: <FileText size={20} />,
    },
    {
      label: 'Administration',
      href: '/admin',
      icon: <Settings size={20} />,
    },
  ]

  const isMenuActive = (item: NavItem) => {
    if (item.href) {
      return pathname === item.href || pathname.startsWith(item.href + '/')
    }
    return item.submenu?.some(sub => pathname === sub.href)
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-card border border-border rounded-lg p-2"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - Always rendered, but visibility changes based on screen size */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border z-40 overflow-y-auto pt-20 lg:pt-0 lg:static lg:translate-x-0 lg:!animate-none"
      >
            {/* Logo Area */}
            <div className="p-6 border-b border-sidebar-border hidden lg:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                  <Map size={18} className="text-sidebar-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-sidebar-foreground">VisitorMap</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.submenu ? (
                    <motion.button
                      onClick={() =>
                        setExpandedMenu(expandedMenu === item.label ? null : item.label)
                      }
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                        isMenuActive(item)
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <motion.div
                        animate={{
                          rotate: expandedMenu === item.label ? 180 : 0,
                        }}
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    </motion.button>
                  ) : (
                    <Link href={item.href || '#'}>
                      <motion.button
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isMenuActive(item)
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </motion.button>
                    </Link>
                  )}

                  {/* Submenu */}
                  <AnimatePresence>
                    {item.submenu && expandedMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 space-y-1 mt-1"
                      >
                        {item.submenu.map((subitem) => (
                          <Link key={subitem.label} href={subitem.href || '#'}>
                            <motion.button
                              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                                pathname === subitem.href
                                  ? 'bg-sidebar-primary/20 text-sidebar-accent-foreground'
                                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/30'
                              }`}
                              whileHover={{ x: 4 }}
                            >
                              {subitem.icon}
                              <span>{subitem.label}</span>
                            </motion.button>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </motion.aside>

      {/* Overlay on Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
