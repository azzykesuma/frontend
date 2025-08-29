import { Progress } from '@/components/ui/progress'

interface HealthBarProps {
  name: string
  currentHealth: number
  maxHealth: number
  variant: 'player' | 'enemy'
}

const HealthBar = ({
  name,
  currentHealth,
  maxHealth,
  variant,
}: HealthBarProps) => {
  const isPlayer = variant === 'player'
  const borderColor = isPlayer ? 'border-amber-600' : 'border-red-600'
  const textColor = isPlayer ? 'text-amber-400' : 'text-red-400'

  return (
    <div className="w-64">
      <div className="flex items-center justify-between mb-1">
        <span className={`${textColor} font-bold text-sm`}>
          {name || (isPlayer ? 'Hero' : 'Enemy')}
        </span>
        <span className="text-white text-sm">
          {currentHealth || 0} / {maxHealth || 0}
        </span>
      </div>
      <Progress
        value={maxHealth ? (currentHealth / maxHealth) * 100 : 0}
        className={`h-3 bg-gray-800 border ${borderColor}`}
      />
    </div>
  )
}

export default HealthBar
