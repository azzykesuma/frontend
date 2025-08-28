import {
  Droplets,
  Flame,
  Hammer,
  Mountain,
  Sword,
  Target,
  Wand2,
} from 'lucide-react'
import { getRarityColor, getRarityLabel } from '../_util'
import type { IWeapon } from '../_schema/schema'

interface WeaponCardProps {
  weapon: IWeapon
  isSelected: boolean
  onClick: (weapon: IWeapon) => void
}

const elements = {
  1: { name: 'Neutral', color: 'from-gray-500 to-slate-500', icon: Mountain },
  2: { name: 'Water', color: 'from-blue-500 to-cyan-500', icon: Droplets },
  3: { name: 'Earth', color: 'from-amber-600 to-yellow-500', icon: Mountain },
  4: { name: 'Fire', color: 'from-red-500 to-orange-500', icon: Flame },
}

const weaponTypes = {
  7: { name: 'Melee', icon: Hammer },
  8: { name: 'Sword', icon: Sword },
  9: { name: 'Ranged', icon: Target },
  10: { name: 'Staff', icon: Wand2 },
}

const WeaponCard = ({ weapon, isSelected, onClick }: WeaponCardProps) => {
  const element = elements[weapon.weapon_element as keyof typeof elements]
  const weaponType = weaponTypes[weapon.weapon_type as keyof typeof weaponTypes]
  const ElementIcon = element.icon
  const TypeIcon = weaponType.icon
  const rarityColor = getRarityColor(weapon.weapon_base_damage)
  const rarity = getRarityLabel(weapon.weapon_base_damage)

  return (
    <div
      className={`relative backdrop-blur-xl border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isSelected
          ? `bg-black/50 ${rarityColor} ring-2 shadow-2xl`
          : `bg-black/30 border-slate-700 hover:border-slate-500 hover:shadow-xl`
      }`}
      onClick={() => onClick(weapon)}
    >
      {/* Rarity indicator */}
      <div className="absolute -top-2 -right-2 px-2 py-1 bg-black/80 rounded-full text-xs font-semibold">
        <span
          className={`${weapon.weapon_base_damage >= 40 ? 'text-purple-400' : weapon.weapon_base_damage >= 25 ? 'text-blue-400' : weapon.weapon_base_damage >= 15 ? 'text-green-400' : 'text-gray-400'}`}
        >
          {rarity}
        </span>
      </div>

      {/* Weapon image */}
      <div className="relative mb-4 aspect-square">
        <img
          src={weapon.weapon_image}
          alt={weapon.weapon_name}
          className="w-full h-full object-contain rounded-lg"
        />
        {/* Element overlay */}
        <div
          className={`absolute top-2 left-2 w-8 h-8 bg-gradient-to-r ${element.color} rounded-full flex items-center justify-center shadow-lg`}
        >
          <ElementIcon className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Weapon info */}
      <div className="text-center mb-3">
        <h3 className="text-lg font-bold text-white capitalize mb-1">
          {weapon.weapon_name}
        </h3>
        <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
          <TypeIcon className="w-4 h-4" />
          <span>{weaponType.name}</span>
          <span>•</span>
          <span className="text-slate-300">{element.name}</span>
        </div>
      </div>

      {/* Damage bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Base Damage</span>
          <span className="font-semibold text-white">
            {weapon.weapon_base_damage}
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${element.color} transition-all duration-500`}
            style={{
              width: `${Math.min((weapon.weapon_base_damage / 50) * 100, 100)}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default WeaponCard
