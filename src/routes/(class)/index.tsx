import { queryOptions, useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { Shield, Sword, Target, Wind, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import ClassGrid from './-components/ClassGrid'
import SelectedClass from './-components/SelectedClass'
import { ClassSelectionSkeleton } from './-components/SkeletonSection'
import type { BaseResponseDto, IMasterClass } from '@/lib/types'
import type { AxiosResponse } from 'axios'
import type { IPlayerDetails } from '../main-game/-schema/Player'
import { decodeJwt } from '@/lib/cookies'
import { BASE_CONFIG, QUERY_KEYS } from '@/lib/constant'
import { useApiMutation } from '@/hooks/useMutation.hooks'
import { Button } from '@/components/ui/button'
import { getMasterClass } from '@/api/masterClass'
import { getPlayerDetails } from '@/api/player'

export const Route = createFileRoute('/(class)/')({
  component: App,
  loader: () => {
    const accessToken = Cookies.get(BASE_CONFIG.REFRESH_TOKEN)
    if (!accessToken) {
      redirect({ to: '/login', throw: true })
    }
  },
})

const classIcons = {
  Knight: Sword,
  Mage: Zap,
  Paladin: Shield,
  Monk: Wind,
  Rogue: Target,
}

const queryMasterClass = queryOptions({
  queryKey: [QUERY_KEYS.MASTER_CLASS],
  queryFn: getMasterClass,
})

const queryPlayerDetails = queryOptions<
  AxiosResponse<BaseResponseDto<IPlayerDetails>>
>({
  queryKey: [QUERY_KEYS.PLAYER_DETAILS],
  queryFn: getPlayerDetails,
  refetchOnWindowFocus: false,
})

function App() {
  const { data, isLoading } = useQuery(queryMasterClass)
  const { data: playerDetailsData } = useQuery(queryPlayerDetails)
  const navigate = useNavigate()
  const [selectedClass, setSelectedClass] = useState<IMasterClass | null>(null)
  const user = decodeJwt()

  const handleClassSelect = (classItem: IMasterClass) => {
    setSelectedClass(classItem)
  }

  const { mutate: SELECT_MASTER_CLASS } = useApiMutation(
    '/api/player/select-class',
    'post',
    {
      onSuccess: () => {
        toast.success('Class selected successfully')
        navigate({ to: '/weapon' })
      },
    },
  )

  const handleConfirmSelection = () => {
    SELECT_MASTER_CLASS({
      masterClassId: selectedClass?.class_id,
      playerId: user.id,
    })
  }

  useEffect(() => {
    if (playerDetailsData?.data.data && playerDetailsData.data.data.class_id) {
      const classId = playerDetailsData.data.data.class_id
      if (classId && data?.data.data) {
        const playerSelectedClass = data.data.data.find(
          (item: IMasterClass) => item.class_id === +classId,
        )
        setSelectedClass(playerSelectedClass || null)
      }
    }
  }, [playerDetailsData, data])

  if (isLoading) {
    return <ClassSelectionSkeleton showDetailedView />
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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Choose Your Class
          </h1>
          <p className="text-slate-400 text-lg">
            Select your path and begin your legendary journey
          </p>
        </div>

        {/* Class Grid */}
        <ClassGrid
          data={data?.data.data}
          selectedClass={selectedClass || ({} as IMasterClass)}
          classIcons={classIcons}
          handleClassSelect={handleClassSelect}
        />

        {/* Selected class details */}
        {selectedClass && (
          <SelectedClass
            classIcons={classIcons}
            selectedClass={selectedClass}
          />
        )}

        {/* Action buttons */}
        <div className="flex justify-center space-x-4">
          <Button onClick={() => setSelectedClass(null)} variant="outline">
            Clear Selection
          </Button>
          <Button
            onClick={handleConfirmSelection}
            disabled={!selectedClass}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Confirm Selection
          </Button>
        </div>
      </div>
    </div>
  )
}
