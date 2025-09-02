import type { IEnemy } from '../-schema/Enemy'
import type { IPlayerDetails } from '../-schema/Player'
import { BASE_STATS } from '@/lib/constant'

export const calculateEnemyDamage = (
  currentEnemyPayload: IEnemy,
  player: IPlayerDetails,
) => {
  const enemyDex = currentEnemyPayload.enemy_base_dex
  const enemyDamage = BASE_STATS.ENEMY.BASE_DAMAGE
  const damageRandomize = Math.floor(Math.random() * 10)
  const damageReduction =
    player.class_base_str * 0.2 - BASE_STATS.PLAYER.BASE_CONSTITUTION
  const enemyFinalDamage =
    enemyDamage + enemyDex + damageRandomize - damageReduction
  return enemyFinalDamage
}
