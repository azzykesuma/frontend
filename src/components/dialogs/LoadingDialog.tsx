import { Gamepad2, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function LoadingDialog({ isOpen }: { isOpen: boolean }) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md bg-black/90 border-purple-500/30 backdrop-blur-xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-white flex items-center justify-center space-x-2">
            <Gamepad2 className="w-6 h-6 text-purple-400" />
            <span>Connecting to Game</span>
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Please wait while we authenticate your credentials...
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 py-6">
          {/* Multiple spinning rings */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
            <div
              className="absolute inset-2 w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin animation-delay-150"
              style={{ animationDirection: 'reverse' }}
            ></div>
            <div className="absolute inset-4 w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin animation-delay-300"></div>
          </div>

          {/* Loading text with dots animation */}
          <div className="flex items-center space-x-2 text-slate-300">
            <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
            <span className="font-medium">Initializing session</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse animation-delay-150"></div>
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse animation-delay-300"></div>
            </div>
          </div>

          {/* Progress-like bars */}
          <div className="w-full space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Verifying credentials</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full w-full"></div>
            </div>

            <div className="flex justify-between text-xs text-slate-400">
              <span>Loading game data</span>
              <span>67%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
