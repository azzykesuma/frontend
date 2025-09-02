import { createFileRoute } from '@tanstack/react-router'
import { Gamepad2, Shield } from 'lucide-react'
import LoginForm from './-components/-LoginForm'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="relative w-full max-w-md">
          {/* Main login container */}
          <div className="backdrop-blur-xl bg-black/30 border border-purple-500/20 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-4 shadow-lg">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                GAME LOGIN
              </h1>
              <p className="text-slate-400 mt-2">Enter the arena</p>
            </div>

            {/* Login form */}
            <LoginForm />

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-slate-400">OR</span>
              </div>
            </div>

            {/* Social login */}
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-slate-800/50 border border-slate-700 hover:border-slate-600 text-white rounded-lg transition-all duration-300 flex items-center justify-center space-x-3 hover:bg-slate-800/80">
                <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-yellow-500 rounded"></div>
                <span>Continue with Steam</span>
              </button>
              <button className="w-full py-3 px-4 bg-slate-800/50 border border-slate-700 hover:border-slate-600 text-white rounded-lg transition-all duration-300 flex items-center justify-center space-x-3 hover:bg-slate-800/80">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>Continue with Discord</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
