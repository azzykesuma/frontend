// src/hooks/useApiMutation.ts
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import api from '../lib/api' // The Axios instance you created earlier
import type { AxiosError } from 'axios'
import type {
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { BASE_CONFIG } from '@/lib/constant'

// Define a type for a generic API error response
interface ApiErrorResponse {
  error: string
}

// Create a reusable error handler function for consistency
const handleApiError = (error: unknown) => {
  console.log('error', error)
  if (isAxiosError<ApiErrorResponse>(error) && error.response) {
    const errorMessage =
      error.response.data.error || 'An unknown server error occurred.'
    toast.error(errorMessage)
  } else {
    toast.error('An unexpected network error occurred.')
  }
}

type HttpMethod = 'post' | 'put' | 'patch' | 'delete'

/**
 * A custom hook to abstract API mutations using TanStack Query.
 * @template TData The expected response data type.
 * @template TVariables The data type sent in the request body.
 * @param endpoint The API endpoint to call (e.g., '/api/auth/login').
 * @param method The HTTP method to use (e.g., 'post', 'put'). Defaults to 'post'.
 * @param options TanStack Query mutation options to override or extend.
 * @returns The useMutation result object.
 */
export const useApiMutation = <TData = unknown, TVariables = unknown>(
  endpoint: string,
  method: HttpMethod = 'post',
  options?: Omit<
    UseMutationOptions<TData, AxiosError, TVariables>,
    'mutationFn'
  >,
): UseMutationResult<TData, AxiosError, TVariables> => {
  return useMutation({
    mutationFn: async (variables: TVariables): Promise<TData> => {
      // Use a type assertion to handle the dynamic method call
      const response = await api[method]<TData>(
        `${BASE_CONFIG.baseURL}${endpoint}`,
        variables,
      )
      return response.data
    },
    onError: handleApiError,
    ...options, // Allow custom options to be passed in
  })
}
