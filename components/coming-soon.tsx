import { motion } from 'framer-motion'
import { Zap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ComingSoonProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

export function ComingSoon({ title, description, icon }: ComingSoonProps) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="flex justify-center mb-6"
        >
          <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full">
            {icon || <Zap size={48} className="text-primary" />}
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>

        {/* Description */}
        <p className="text-muted-foreground mb-8">
          {description || 'This page is coming soon. We\'re working hard to bring you this feature.'}
        </p>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-8"
        />

        {/* CTA Button */}
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05, x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-colors hover:opacity-90"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
