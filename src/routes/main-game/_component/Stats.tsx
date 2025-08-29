import type { IPlayerDetails } from '../_schema/Player'
import type { IEnemy } from '../_schema/Enemy'

interface StatsProps {
  currentEnemy: IEnemy
  playerDetails: IPlayerDetails
}

const Stats = ({ currentEnemy, playerDetails }: StatsProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-gray-900 to-transparent p-6 w-full">
      {/* Decorative border line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-80"></div>

      <div className="flex justify-between items-start max-w-7xl mx-auto">
        {/* Player Stats - Left Side */}
        <div className="w-2/5 bg-black bg-opacity-80 border-2 border-amber-600 rounded-lg p-4 shadow-2xl">
          {/* Player Header */}
          <div className="border-b border-amber-600 pb-3 mb-4">
            <h2 className="text-amber-400 font-bold text-xl tracking-wide">
              {playerDetails.player_name}
            </h2>
            <p className="text-amber-200 text-sm font-medium">
              {playerDetails.class_name}
            </p>
          </div>

          {/* Player Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm font-medium">STR</span>
                <span className="text-red-400 font-bold">
                  {playerDetails.class_base_str}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm font-medium">DEX</span>
                <span className="text-green-400 font-bold">
                  {playerDetails.class_base_dex}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm font-medium">INT</span>
                <span className="text-blue-400 font-bold">
                  {playerDetails.class_base_int}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="border-l-2 border-amber-600 pl-3">
                <p className="text-amber-300 text-xs font-medium uppercase tracking-wider">
                  Weapon
                </p>
                <p className="text-white font-bold text-sm">
                  {playerDetails.weapon_name}
                </p>
                <p className="text-orange-400 text-xs">
                  DMG: {playerDetails.weapon_base_damage}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enemy Stats - Right Side */}
        <div className="w-2/5 bg-black bg-opacity-80 border-2 border-red-600 rounded-lg p-4 shadow-2xl">
          {/* Enemy Header */}
          <div className="border-b border-red-600 pb-3 mb-4">
            <h2 className="text-red-400 font-bold text-xl tracking-wide">
              {currentEnemy.enemy_name}
            </h2>
            <p className="text-red-200 text-sm font-medium">Enemy</p>
          </div>

          {/* Enemy Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm font-medium">HP</span>
                <span className="text-red-400 font-bold">
                  {currentEnemy.enemy_base_hp}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm font-medium">MP</span>
                <span className="text-blue-400 font-bold">
                  {currentEnemy.enemy_base_mp}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm font-medium">CON</span>
                <span className="text-yellow-400 font-bold">
                  {currentEnemy.enemy_base_constitution}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm font-medium">DEX</span>
                <span className="text-green-400 font-bold">
                  {currentEnemy.enemy_base_dex}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm font-medium">INT</span>
                <span className="text-purple-400 font-bold">
                  {currentEnemy.enemy_base_int}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm font-medium">WEAK</span>
                <span className="text-orange-400 font-bold">
                  {currentEnemy.enemy_weakness}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-red-600 to-amber-600 opacity-30"></div>
    </div>
  )
}

export default Stats
