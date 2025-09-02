import { ChevronRight, Star } from 'lucide-react'
import React from 'react'
import type { IMasterClass } from '@/lib/types'

interface ClassItemsProps {
  classItem: IMasterClass
  isSelected: boolean
  handleClassSelect: (classItem: IMasterClass) => void
  classIcons: Record<string, React.ElementType>
}

const classColors = {
  Knight: 'from-red-500 to-orange-500',
  Mage: 'from-blue-500 to-purple-500',
  Paladin: 'from-yellow-400 to-amber-500',
  Monk: 'from-green-400 to-emerald-500',
  Rogue: 'from-purple-500 to-pink-500',
}

const statNames = {
  str: 'Strength',
  int: 'Intelligence',
  dex: 'Dexterity',
  hp: 'Health Points',
  mp: 'Mana Points',
}

const getStatBars = (classItem: IMasterClass) => {
  const stats = [
    { name: 'STR', value: classItem.class_base_str, max: 100, key: 'str' },
    { name: 'INT', value: classItem.class_base_int, max: 100, key: 'int' },
    { name: 'DEX', value: classItem.class_base_dex, max: 100, key: 'dex' },
    { name: 'HP', value: classItem.class_base_hp, max: 100, key: 'hp' },
    { name: 'MP', value: classItem.class_base_mp, max: 100, key: 'mp' },
  ]

  return stats.map((stat) => (
    <div key={stat.key} className="flex items-center justify-between">
      <span
        className={`text-xs font-medium ${classItem.class_main_stat === stat.key ? `text-yellow-400` : `text-slate-300`}`}
      >
        {stat.name}
        {classItem.class_main_stat === stat.key && (
          <Star className="w-3 h-3 inline ml-1 text-yellow-400" />
        )}
      </span>
      <div className="flex items-center space-x-2 flex-1 ml-3">
        <div className="flex-1 bg-slate-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${classItem.class_main_stat === stat.key ? `from-yellow-400 to-yellow-500` : `from-slate-400 to-slate-500`} transition-all duration-500`}
            style={{ width: `${stat.value}%` }}
          ></div>
        </div>
        <span className="text-xs text-slate-400 w-8 text-right">
          {stat.value}
        </span>
      </div>
    </div>
  ))
}

const ClassItems = ({
  classItem,
  isSelected,
  handleClassSelect,
  classIcons,
}: ClassItemsProps) => {
  const IconComponent = classIcons[classItem.class_name]

  return (
    <div
      className={`relative backdrop-blur-xl border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'bg-black/50 border-purple-400 ring-2 ring-purple-400 shadow-2xl shadow-purple-500/20'
          : 'bg-black/30 border-slate-700 hover:border-slate-500'
      }`}
      onClick={() => handleClassSelect(classItem)}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
          <ChevronRight className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Class icon and name */}
      <div className="text-center mb-4">
        <div
          className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${classColors[classItem.class_name as keyof typeof classColors]} rounded-full mb-3 shadow-lg`}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">{classItem.class_name}</h3>
        <p className="text-sm text-slate-400 capitalize">
          Main Stat:{' '}
          {statNames[classItem.class_main_stat as keyof typeof statNames]}
        </p>
      </div>

      {/* Stats */}
      <div className="space-y-2">{getStatBars(classItem)}</div>
    </div>
  )
}

export default ClassItems
