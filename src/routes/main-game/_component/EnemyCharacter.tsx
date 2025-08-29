import HealthBar from './HealthBar'

interface EnemyCharacterProps {
  enemyImage: string
  enemyName: string
  currentHealth: number
  maxHealth: number
}

const EnemyCharacter = ({
  enemyImage,
  enemyName,
  currentHealth,
  maxHealth,
}: EnemyCharacterProps) => {
  return (
    <div className="flex flex-col justify-center items-end h-full w-1/2">
      {currentHealth > 0 && (
        <HealthBar
          name={enemyName}
          currentHealth={currentHealth}
          maxHealth={maxHealth}
          variant="enemy"
        />
      )}

      <div className="relative">
        <img
          src={enemyImage}
          alt="Enemy"
          className="h-96 w-auto object-contain drop-shadow-2xl transform scale-x-[-1]"
        />
      </div>
    </div>
  )
}

export default EnemyCharacter
