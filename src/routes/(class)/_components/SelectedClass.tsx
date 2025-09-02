import { Star } from 'lucide-react'
import React from 'react'
import type { IMasterClass } from '@/lib/types'

interface SelectedClassProps {
  selectedClass: IMasterClass
  classIcons: Record<string, React.ElementType>
}

const classColors = {
  Knight: 'from-red-500 to-orange-500',
  Mage: 'from-blue-500 to-purple-500',
  Paladin: 'from-yellow-400 to-amber-500',
  Monk: 'from-green-400 to-emerald-500',
  Rogue: 'from-purple-500 to-pink-500',
}

const classDescriptions = {
  Knight:
    'A mighty warrior with heavy armor and powerful attacks. Masters of strength and defense.',
  Mage: 'A wielder of arcane magic with devastating spells. High intelligence and magical power.',
  Paladin:
    'A holy warrior combining magic and martial prowess. Balanced stats with divine abilities.',
  Monk: 'A swift fighter using martial arts and inner energy. High dexterity and agility.',
  Rogue:
    'A stealthy assassin with quick strikes and cunning. Masters of speed and precision.',
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
const SelectedClass = ({ selectedClass, classIcons }: SelectedClassProps) => {
  return (
    <div className="backdrop-blur-xl bg-black/30 border border-purple-500/20 rounded-2xl p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div
            className={`w-20 h-20 bg-gradient-to-r ${classColors[selectedClass.class_name as keyof typeof classColors]} rounded-full flex items-center justify-center shadow-lg`}
          >
            {(() => {
              const IconComponent = classIcons[selectedClass.class_name]
              return <IconComponent className="w-10 h-10 text-white" />
            })()}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">
              {selectedClass.class_name}
            </h2>
            <p className="text-slate-400">
              Primary Attribute:{' '}
              {
                statNames[
                  selectedClass.class_main_stat as keyof typeof statNames
                ]
              }
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Base Statistics
          </h3>
          <div className="space-y-3">{getStatBars(selectedClass)}</div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Class Description
          </h3>
          <p className="text-slate-300 leading-relaxed">
            {
              classDescriptions[
                selectedClass.class_name as keyof typeof classDescriptions
              ]
            }
          </p>

          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-600">
            <h4 className="text-sm font-semibold text-yellow-400 mb-2">
              Starting Bonuses
            </h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>
                • Enhanced{' '}
                {
                  statNames[
                    selectedClass.class_main_stat as keyof typeof statNames
                  ]
                }{' '}
                growth
              </li>
              <li>• Class-specific abilities unlocked</li>
              <li>• Unique equipment access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectedClass
