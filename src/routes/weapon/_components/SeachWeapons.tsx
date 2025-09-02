import { Filter, Search } from 'lucide-react'
import { useState } from 'react'
import { elements, sortOptions, weaponTypes } from './WeaponElements'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SeachWeaponsProps {
  filters: {
    searchTerm: string
    filterElement: string
    filterType: string
  }
  handleFilterChange: (
    field: 'searchTerm' | 'filterElement' | 'filterType',
    value: string,
  ) => void
}
const SeachWeapons = ({ filters, handleFilterChange }: SeachWeaponsProps) => {
  const { searchTerm, filterElement, filterType } = filters
  const [showFilters, setShowFilters] = useState(false)
  return (
    <div className="backdrop-blur-xl bg-black/30 border border-slate-700 rounded-2xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search weapons..."
            value={searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className="w-full pl-10 pr-4  bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400 py-6"
          />
        </div>

        <Button
          onClick={() => setShowFilters(!showFilters)}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-300 flex items-center space-x-2"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </Button>
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-700">
          {/* Element filter */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Element
            </label>
            <select
              value={filterElement}
              onChange={(e) =>
                handleFilterChange('filterElement', e.target.value)
              }
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Elements</option>
              {Object.entries(elements).map(([id, element]) => (
                <option key={id} value={id}>
                  {element.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type filter */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Type
            </label>
            <select
              value={filterType}
              onChange={(e) => handleFilterChange('filterType', e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Types</option>
              {Object.entries(weaponTypes).map(([id, type]) => (
                <option key={id} value={id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Sort By
            </label>
            <select
              value={filterType}
              onChange={(e) => handleFilterChange('filterType', e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default SeachWeapons
