'use client'

import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L, { LatLng } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'

// Sample data points untuk simulasi visitor density
const generateDensityData = (timeIndex: number) => {
  const basePoints = [
    { lat: -8.6753, lng: 115.2121, intensity: 0.8 }, // Area A
    { lat: -8.6765, lng: 115.2135, intensity: 0.6 }, // Area B
    { lat: -8.6745, lng: 115.2105, intensity: 0.7 }, // Area C
    { lat: -8.6775, lng: 115.2125, intensity: 0.5 }, // Area D
  ]

  return basePoints.map((point) => ({
    ...point,
    intensity: Math.min(
      1,
      point.intensity +
        Math.sin(Date.now() / 2000 + timeIndex * 0.1) * 0.2
    ),
  }))
}

function HeatmapRenderer({ points }: { points: Array<{ lat: number; lng: number; intensity: number }> }) {
  const map = useMap()
  const layerRef = useRef<L.FeatureGroup | null>(null)

  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.clearLayers()
    } else {
      layerRef.current = L.featureGroup().addTo(map)
    }

    points.forEach((point) => {
      const color = `hsl(${(1 - point.intensity) * 240}, 100%, 50%)`
      const radius = 50 + point.intensity * 100

      const circle = L.circleMarker([point.lat, point.lng], {
        radius: radius / 80,
        fillColor: color,
        color: color,
        weight: 2,
        opacity: point.intensity,
        fillOpacity: point.intensity * 0.6,
      }).addTo(layerRef.current!)

      circle.bindPopup(
        `<div class="p-2">
          <p class="font-semibold">Density: ${Math.round(point.intensity * 100)}%</p>
          <p class="text-sm">Lat: ${point.lat.toFixed(4)}</p>
          <p class="text-sm">Lng: ${point.lng.toFixed(4)}</p>
        </div>`
      )
    })
  }, [points, map])

  return null
}

export function DensityMap() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeIndex, setTimeIndex] = useState(0)
  const [speed, setSpeed] = useState(1)
  const animationRef = useRef<NodeJS.Timeout | null>(null)

  const densityPoints = generateDensityData(timeIndex)

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = setInterval(() => {
        setTimeIndex((prev) => (prev + 1) % 100)
      }, 500 / speed)
    }

    return () => {
      if (animationRef.current) clearInterval(animationRef.current)
    }
  }, [isPlaying, speed])

  const handleReset = () => {
    setTimeIndex(0)
    setIsPlaying(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden"
    >
      {/* Controls */}
      <div className="flex items-center gap-4 p-4 border-b border-border bg-secondary/10">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
          >
            <RotateCcw size={20} />
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">Speed:</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-24 h-2 bg-border rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-muted-foreground w-8 text-right">{speed.toFixed(1)}x</span>
        </div>

        <div className="flex-1">
          <div className="text-sm text-muted-foreground">
            Time: {String(Math.floor(timeIndex / 4)).padStart(2, '0')}:
            {String((timeIndex % 4) * 15).padStart(2, '0')}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span>High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-yellow-500" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span>Low</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={[-8.675, 115.212]}
          zoom={17}
          style={{ height: '100%', width: '100%' }}
          className="z-10"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <HeatmapRenderer points={densityPoints} />
        </MapContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 p-4 border-t border-border bg-secondary/10">
        <div className="bg-card rounded-lg p-3 border border-border text-center">
          <p className="text-xs text-muted-foreground">Avg Density</p>
          <p className="text-lg font-bold text-foreground">
            {Math.round(
              (densityPoints.reduce((sum, p) => sum + p.intensity, 0) /
                densityPoints.length) *
                100
            )}
            %
          </p>
        </div>
        <div className="bg-card rounded-lg p-3 border border-border text-center">
          <p className="text-xs text-muted-foreground">Peak Area</p>
          <p className="text-lg font-bold text-foreground">
            {Math.round(Math.max(...densityPoints.map((p) => p.intensity)) * 100)}%
          </p>
        </div>
        <div className="bg-card rounded-lg p-3 border border-border text-center">
          <p className="text-xs text-muted-foreground">Low Area</p>
          <p className="text-lg font-bold text-foreground">
            {Math.round(Math.min(...densityPoints.map((p) => p.intensity)) * 100)}%
          </p>
        </div>
        <div className="bg-card rounded-lg p-3 border border-border text-center">
          <p className="text-xs text-muted-foreground">Active Points</p>
          <p className="text-lg font-bold text-foreground">{densityPoints.length}</p>
        </div>
      </div>
    </motion.div>
  )
}
