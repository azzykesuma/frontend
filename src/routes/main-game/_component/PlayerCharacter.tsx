import { Sword } from 'lucide-react'
import HealthBar from './HealthBar'
import { Button } from '@/components/ui/button'

interface PlayerCharacterProps {
  playerSprite: string
  playerName: string
  currentHealth: number
  maxHealth: number
  onAttack: () => void
  isEnemyAttacking: boolean
}

const PlayerCharacter = ({
  playerSprite,
  playerName,
  currentHealth,
  maxHealth,
  onAttack,
  isEnemyAttacking,
}: PlayerCharacterProps) => {
  return (
    <div className="flex flex-col justify-center items-start h-full w-1/2 ">
      <HealthBar
        name={playerName}
        currentHealth={currentHealth}
        maxHealth={maxHealth}
        variant="player"
      />

      <div className="relative">
        <img
          src={playerSprite}
          alt="Player"
          className="h-96 w-auto object-contain drop-shadow-2xl"
        />

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <Button
            onClick={onAttack}
            variant="outline"
            className="bg-amber-600/70 border-amber-500 text-white hover:bg-amber-600/90 transition-all duration-200"
            disabled={isEnemyAttacking}
          >
            <Sword className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PlayerCharacter
