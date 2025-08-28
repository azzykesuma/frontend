import {
  Droplets,
  Flame,
  Hammer,
  Mountain,
  Sword,
  Target,
  Wand2,
} from 'lucide-react'

export const elements = {
  1: { name: 'Neutral', color: 'from-gray-500 to-slate-500', icon: Mountain },
  2: { name: 'Water', color: 'from-blue-500 to-cyan-500', icon: Droplets },
  3: { name: 'Earth', color: 'from-amber-600 to-yellow-500', icon: Mountain },
  4: { name: 'Fire', color: 'from-red-500 to-orange-500', icon: Flame },
}

export const weaponTypes = {
  7: { name: 'Melee', icon: Hammer },
  8: { name: 'Sword', icon: Sword },
  9: { name: 'Ranged', icon: Target },
  10: { name: 'Staff', icon: Wand2 },
}

export const sortOptions = [
  { value: 'name', label: 'Name A-Z' },
  { value: 'damage_asc', label: 'Damage Low-High' },
  { value: 'damage_desc', label: 'Damage High-Low' },
  { value: 'element', label: 'Element' },
  { value: 'type', label: 'Type' },
]
