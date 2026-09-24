import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { SensorReading, TimeRange } from '../types/sensor'

interface GraficoSensorProps {
  data: SensorReading[]
  dataKey: keyof Omit<SensorReading, 'timestamp'>
  color: string
  unit: string
  range?: TimeRange
  thresholdMin?: number
  thresholdMax?: number
}

function formatTick(timestamp: string, range?: TimeRange) {
  const d = new Date(timestamp)
  if (range === '30d') {
    return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })
  }
  if (range === '7d') {
    return d.toLocaleDateString('es-CO', { weekday: 'short' })
  }
  return d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
}

export default function GraficoSensor({
  data,
  dataKey,
  color,
  unit,
  range,
  thresholdMin,
  thresholdMax,
}: GraficoSensorProps) {
  const gradientId = `gradient-${dataKey}`

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 8" vertical={false} stroke="#eef2e6" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(v) => formatTick(v, range)}
          tick={{ fontSize: 11, fill: '#9CA3AF' }}
          axisLine={false}
          tickLine={false}
          minTickGap={24}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#9CA3AF' }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: '1px solid #eef2e6',
            boxShadow: '0 8px 24px rgba(20,40,10,0.12)',
          }}
          formatter={(value: number) => [`${value} ${unit}`, '']}
          labelFormatter={(v) => new Date(v).toLocaleString('es-CO')}
        />
        {thresholdMin !== undefined && (
          <ReferenceLine y={thresholdMin} stroke="#f59e0b" strokeDasharray="4 4" />
        )}
        {thresholdMax !== undefined && (
          <ReferenceLine y={thresholdMax} stroke="#ef4444" strokeDasharray="4 4" />
        )}
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2.5}
          fill={`url(#${gradientId})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
