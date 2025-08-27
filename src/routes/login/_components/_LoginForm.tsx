import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { Eye, EyeOff, Zap } from 'lucide-react'
import { AnimatePresence, motion as m } from 'motion/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { loginSchema } from '../_lib/_schema'
import type { LoginResponseDto } from '../_dto/_LoginDto'
import type { LoginSchema } from '../_lib/_schema'
import { useApiMutation } from '@/hooks/useMutation.hooks'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoadingDialog } from '@/components/dialogs/LoadingDialog'
import { BASE_CONFIG } from '@/lib/constant'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const navigate = useNavigate()
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const { mutate: HANDLE_LOGIN, isPending } = useApiMutation<
    LoginResponseDto,
    LoginSchema
  >('/api/auth/login', 'post', {
    onSuccess: (data) => {
      if (data.statusCode === 200) {
        Cookies.set(BASE_CONFIG.ACCESS_TOKEN, data.data?.accessToken ?? '')
        Cookies.set(BASE_CONFIG.REFRESH_TOKEN, data.data?.refreshToken ?? '')
        toast.success('Login successful')
        navigate({ to: '/' })
      }
    },
  })

  const { mutate: HANDLE_REGISTER, isPending: isPendingRegister } =
    useApiMutation<LoginResponseDto, LoginSchema>(
      '/api/auth/register',
      'post',
      {
        onSuccess: (data) => {
          if (data.statusCode === 200) {
            toast.success('Register successful')
            setIsRegister(false)
          }
        },
      },
    )

  const handleLogin = (data: LoginSchema) => {
    console.log('data', data)
    HANDLE_LOGIN(data)
  }

  const handleRegister = (data: LoginSchema) => {
    HANDLE_REGISTER(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(isRegister ? handleRegister : handleLogin)}>
        <div className="space-y-6">
          <div className="relative">
            <Label className="my-2 text-white">Username</Label>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  placeholder="Username"
                  className="text-white"
                />
              )}
            />
            <AnimatePresence>
              {errors.username && (
                <m.p
                  className="text-red-500 text-sm mt-3"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.username.message}
                </m.p>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <Label className="my-2 text-white">Password</Label>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                    placeholder="Password"
                    className="text-white pr-12" // add right padding for the button
                  />
                )}
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center text-slate-400 transition-colors hover:bg-transparent p-0 h-auto"
                variant="ghost"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </Button>
            </div>
            <AnimatePresence>
              {errors.password && (
                <m.p
                  className="text-red-500 text-sm mt-3"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.password.message}
                </m.p>
              )}
            </AnimatePresence>
          </div>

          {/* Login button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isPending ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>{isRegister ? 'REGISTER' : 'ENTER GAME'}</span>
              </>
            )}
          </Button>
        </div>
      </form>
      {/* Sign up link */}
      <div className="text-center mt-6">
        <p className="text-slate-400">
          New player?{' '}
          <Button
            onClick={() => setIsRegister(!isRegister)}
            variant="link"
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
          >
            Create Account
          </Button>
        </p>
      </div>
      {(isPending || isPendingRegister) && <LoadingDialog isOpen />}
    </>
  )
}

export default LoginForm
