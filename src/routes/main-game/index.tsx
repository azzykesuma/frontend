import { queryOptions, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import EnemyCharacter from './_component/EnemyCharacter'
import PlayerCharacter from './_component/PlayerCharacter'
import Stats from './_component/Stats'
import { calculateEnemyDamage } from './_lib/calculateDamage'
import type { BaseResponseDto } from '@/lib/types'
import type { AxiosResponse } from 'axios'
import type { IEnemy } from './_schema/Enemy'
import type { IPlayerDetails } from './_schema/Player'
import { getEnemies } from '@/api/enemies'
import { getPlayerDetails } from '@/api/player'
import bg_image from '@/assets/images/bg.webp'
import PlayerImage from '@/assets/images/gutsAttack.png'
import PlayerHit from '@/assets/images/gutsDamaged.png'
import PlayerAttack from '@/assets/images/gutsSwing.png'
import enemyHitSound from '@/assets/sound/enemy_hit.wav'
import SwordAttackSound from '@/assets/sound/sword_swing.wav'
import { QUERY_KEYS } from '@/lib/constant'

export const Route = createFileRoute('/main-game/')({
  component: RouteComponent,
})

const queryEnemies = queryOptions<
  AxiosResponse<BaseResponseDto<Array<IEnemy>>>
>({
  queryKey: [QUERY_KEYS.ENEMIES],
  queryFn: getEnemies,
  refetchOnWindowFocus: false,
})

const queryPlayerDetails = queryOptions<
  AxiosResponse<BaseResponseDto<IPlayerDetails>>
>({
  queryKey: [QUERY_KEYS.PLAYER_DETAILS],
  queryFn: getPlayerDetails,
  refetchOnWindowFocus: false,
})

function RouteComponent() {
  const { data: enemiesData } = useQuery(queryEnemies)
  const { data: playerDetailsData } = useQuery(queryPlayerDetails)

  const [isEnemyAttacking, setIsEnemyAttacking] = useState(false)
  const [currentEnemyImage, setCurrentEnemyImage] = useState(PlayerImage)
  const [playerSprite, setPlayerSprite] = useState(PlayerImage)
  const [playerState, setPlayerState] = useState({
    health: 100,
    mp: 100,
    damage: 10,
  })
  const [enemyState, setEnemyState] = useState({
    health: 100,
    mp: 100,
    damage: 0,
  })

  // Computed values
  const shuffleEnemies = useMemo(() => {
    return enemiesData?.data.data?.sort(() => Math.random() - 0.5)
  }, [enemiesData])
  const [enemyIndex, setEnemyIndex] = useState(0)

  const [currentEnemy, setCurrentEnemy] = useState<IEnemy | null>(null)

  // Initialize the first enemy when the data is ready
  useEffect(() => {
    if (shuffleEnemies?.[0]) {
      setCurrentEnemy(shuffleEnemies[enemyIndex])
    }
  }, [shuffleEnemies])

  // Update enemyState whenever the currentEnemy changes
  useEffect(() => {
    if (currentEnemy && playerDetailsData?.data.data) {
      setEnemyState({
        health: currentEnemy.enemy_base_hp,
        mp: currentEnemy.enemy_base_mp,
        damage: calculateEnemyDamage(currentEnemy, playerDetailsData.data.data),
      })
      setCurrentEnemyImage(currentEnemy.enemy_image)
    }
  }, [currentEnemy, playerDetailsData])

  useEffect(() => {
    if (playerDetailsData?.data.data) {
      setPlayerState({
        health: playerDetailsData.data.data.class_base_hp,
        mp: playerDetailsData.data.data.class_base_mp || 100,
        damage: playerDetailsData.data.data.weapon_base_damage || 10,
      })
    }
  }, [playerDetailsData])

  const handleAttack = () => {
    setPlayerSprite(PlayerAttack)
    let audio = new Audio(SwordAttackSound)
    audio.play()

    // Calculate new enemy health before setting the state
    const newEnemyHealth = enemyState.health - playerState.damage

    setEnemyState({
      ...enemyState,
      health: newEnemyHealth,
    })
    if (currentEnemy) {
      setCurrentEnemyImage(currentEnemy.enemy_image_attacked)
    }

    setTimeout(() => {
      setPlayerSprite(PlayerImage)
      audio.pause()

      // Check if the enemy is dead using the new health value
      if (newEnemyHealth <= 0) {
        setIsEnemyAttacking(false)

        // **Handle advancing to the next enemy here, directly**
        const nextIndex = enemyIndex + 1
        // Check if there are more enemies
        if (shuffleEnemies?.[nextIndex]) {
          setCurrentEnemy(shuffleEnemies[nextIndex])
          setEnemyIndex(nextIndex)
        } else {
          setCurrentEnemy(null)
        }
        return // Return to prevent the counter-attack
      }

      // Enemy counter-attack
      setIsEnemyAttacking(true)
      setPlayerSprite(PlayerHit)
      audio = new Audio(enemyHitSound)
      audio.play()
      setPlayerState({
        health: playerState.health - enemyState.damage,
        mp: playerState.mp - 10,
        damage: playerState.damage,
      })
      setCurrentEnemyImage(currentEnemy?.enemy_image_attack || PlayerImage)

      setTimeout(() => {
        setIsEnemyAttacking(false)
        setCurrentEnemyImage(currentEnemy?.enemy_image || PlayerImage)
        setPlayerSprite(PlayerImage)
      }, 1000)
    }, 1000)
  }

  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen relative"
      style={{ backgroundImage: `url(${bg_image})` }}
    >
      <div className="relative z-10 flex items-center justify-between h-screen px-16">
        <PlayerCharacter
          playerSprite={playerSprite}
          playerName={playerDetailsData?.data.data?.player_name || 'Hero'}
          currentHealth={playerState.health}
          maxHealth={playerDetailsData?.data.data?.class_base_hp || 100}
          onAttack={handleAttack}
          isEnemyAttacking={isEnemyAttacking}
        />

        {currentEnemy && (
          <EnemyCharacter
            enemyImage={currentEnemyImage}
            enemyName={currentEnemy.enemy_name}
            currentHealth={enemyState.health}
            maxHealth={currentEnemy.enemy_base_hp}
          />
        )}
      </div>

      {currentEnemy && playerDetailsData?.data.data && (
        <div className="absolute left-0 bottom-0 w-full z-1">
          <Stats
            currentEnemy={currentEnemy}
            playerDetails={playerDetailsData.data.data}
          />
        </div>
      )}
    </div>
  )
}
