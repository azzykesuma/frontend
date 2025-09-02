import { queryOptions, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { toast } from 'sonner'
import { motion as m } from 'motion/react'
import SeachWeapons from './-components/_SeachWeapons'
import WeaponCard from './-components/_WeaponCard'
import WeaponDetailnfo from './-components/_WeaponDetailnfo'
import WeaponSkeleton from './-components/_WeaponSkeleton'
import type { AxiosResponse } from 'axios'
import type { BaseResponseDto } from '@/lib/types'
import type { IWeapon } from './-schema/schema'
import type { IPlayerDetails } from '../main-game/-schema/Player'
import { QUERY_KEYS } from '@/lib/constant'
import { getWeapon } from '@/api/weapon'
import { Button } from '@/components/ui/button'
import { useApiMutation } from '@/hooks/useMutation.hooks'
import { decodeJwt } from '@/lib/cookies'
import { getPlayerDetails } from '@/api/player'

export const Route = createFileRoute('/weapon/')({
  component: WeaponPage,
})

const queryWeapon = queryOptions<
  AxiosResponse<BaseResponseDto<Array<IWeapon>>>
>({
  queryKey: [QUERY_KEYS.WEAPON],
  queryFn: getWeapon,
})

const queryPlayerDetails = queryOptions<
  AxiosResponse<BaseResponseDto<IPlayerDetails>>
>({
  queryKey: [QUERY_KEYS.PLAYER_DETAILS],
  queryFn: getPlayerDetails,
  refetchOnWindowFocus: false,
})

function WeaponPage() {
  const { data: weaponData, isLoading } = useQuery(queryWeapon)
  const { data: playerDetailsData } = useQuery(queryPlayerDetails)
  const [selectedWeapon, setSelectedWeapon] = useState<IWeapon | null>(null)
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    searchTerm: '',
    filterElement: '',
    filterType: '',
  })

  const { mutate: SELECT_WEAPON } = useApiMutation(
    '/api/player/select-weapon',
    'post',
    {
      onSuccess: () => {
        toast.success('Weapon selected successfully')
        navigate({ to: '/main-game' })
      },
    },
  )
  useEffect(() => {
    if (
      playerDetailsData?.data.data &&
      playerDetailsData.data.data.weapon_id &&
      weaponData?.data.data
    ) {
      const weaponList = weaponData.data.data
      const playerWeaponId = playerDetailsData.data.data.weapon_id

      if (playerWeaponId) {
        const selectedPlayerWeapon = weaponList.find(
          (weapon) => weapon.weapon_id === +playerWeaponId,
        )
        setSelectedWeapon(selectedPlayerWeapon || null)
      }
    }
  }, [playerDetailsData, weaponData])

  if (isLoading) return <WeaponSkeleton />
  if (!weaponData || !weaponData.data.data) return <div>No data</div>

  function handleFilterChange(field: keyof typeof filters, value: string) {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const filteredWeapons = weaponData.data.data.filter((weapon) => {
    const matchesSearch = weapon.weapon_name
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase())
    const matchesElement =
      !filters.filterElement ||
      weapon.weapon_element.toString() === filters.filterElement
    const matchesType =
      !filters.filterType ||
      weapon.weapon_type.toString() === filters.filterType
    return matchesSearch && matchesElement && matchesType
  })

  const handleWeaponSelect = () => {
    const userId = decodeJwt().id
    if (selectedWeapon) {
      SELECT_WEAPON({
        weaponId: selectedWeapon.weapon_id,
        playerId: userId,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Weapon Arsenal
          </h1>
          <p className="text-slate-400 text-lg">
            Choose your weapon and forge your destiny
          </p>
        </div>

        {/* Search and Filters */}
        <SeachWeapons
          filters={filters}
          handleFilterChange={handleFilterChange}
        />

        {/* Results count */}
        <div className="mb-6">
          <p className="text-slate-400">
            Showing {filteredWeapons.length} of {weaponData.data.data.length}{' '}
            weapons
          </p>
        </div>

        {/* Weapons Grid */}
        <m.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
            hidden: {},
          }}
        >
          {filteredWeapons.map((weapon) => (
            <m.div
              key={weapon.weapon_id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: 'spring', stiffness: 80, damping: 18 }}
            >
              <WeaponCard
                weapon={weapon}
                isSelected={selectedWeapon?.weapon_id === weapon.weapon_id}
                onClick={setSelectedWeapon}
              />
            </m.div>
          ))}
        </m.div>

        {/* Selected weapon details */}
        {selectedWeapon && <WeaponDetailnfo selectedWeapon={selectedWeapon} />}

        {/* Action buttons */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => setSelectedWeapon(null)}
            className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-300"
          >
            Clear Selection
          </Button>
          <Button
            disabled={!selectedWeapon}
            onClick={handleWeaponSelect}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Equip Weapon
          </Button>
        </div>
      </div>
    </div>
  )
}
