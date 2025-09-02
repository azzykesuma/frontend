import { getRarityLabel } from '../-util'
import { elements, weaponTypes } from './_WeaponElements'
import type { IWeapon } from '../-schema/schema'

interface WeaponDetailnfoProps {
  selectedWeapon: IWeapon
}

const WeaponDetailnfo = ({ selectedWeapon }: WeaponDetailnfoProps) => {
  return (
    <div className="backdrop-blur-xl bg-black/30 border border-purple-500/20 rounded-2xl p-8 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Weapon image and basic info */}
        <div className="text-center">
          <img
            src={selectedWeapon.weapon_image}
            alt={selectedWeapon.weapon_name}
            className="w-48 h-48 object-contain rounded-lg mx-auto mb-6 shadow-2xl"
          />
          <h2 className="text-3xl font-bold text-white capitalize mb-2">
            {selectedWeapon.weapon_name}
          </h2>
          <p
            className={`text-lg font-semibold mb-4 ${selectedWeapon.weapon_base_damage >= 40 ? 'text-purple-400' : selectedWeapon.weapon_base_damage >= 25 ? 'text-blue-400' : selectedWeapon.weapon_base_damage >= 15 ? 'text-green-400' : 'text-gray-400'}`}
          >
            {getRarityLabel(selectedWeapon.weapon_base_damage)} Weapon
          </p>
        </div>

        {/* Weapon stats */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">
            Weapon Statistics
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">Base Damage</span>
              <span className="text-2xl font-bold text-orange-400">
                {selectedWeapon.weapon_base_damage}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">Element</span>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 bg-gradient-to-r ${elements[selectedWeapon.weapon_element as keyof typeof elements].color} rounded-full`}
                ></div>
                <span className="text-white">
                  {
                    elements[
                      selectedWeapon.weapon_element as keyof typeof elements
                    ].name
                  }
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">Weapon Type</span>
              <div className="flex items-center space-x-2">
                {(() => {
                  const TypeIcon =
                    weaponTypes[
                      selectedWeapon.weapon_type as keyof typeof weaponTypes
                    ].icon
                  return <TypeIcon className="w-5 h-5 text-cyan-400" />
                })()}
                <span className="text-white">
                  {
                    weaponTypes[
                      selectedWeapon.weapon_type as keyof typeof weaponTypes
                    ].name
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-600">
            <h4 className="text-lg font-semibold text-yellow-400 mb-2">
              Special Properties
            </h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>
                •{' '}
                {
                  elements[
                    selectedWeapon.weapon_element as keyof typeof elements
                  ].name
                }{' '}
                element damage
              </li>
              <li>
                •{' '}
                {
                  weaponTypes[
                    selectedWeapon.weapon_type as keyof typeof weaponTypes
                  ].name
                }{' '}
                weapon class
              </li>
              <li>
                • {getRarityLabel(selectedWeapon.weapon_base_damage)} tier
                equipment
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeaponDetailnfo
