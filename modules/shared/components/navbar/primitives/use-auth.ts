/**
 * Shared authentication hook for navbar components
 * Centralizes authentication state to follow DRY principle
 *
 * @returns Authentication state and user information
 */
export function useAuth() {
  // This is a placeholder for authentication logic
  // TODO: Replace with actual authentication implementation
  const isAuthenticated = false
  const user = null

  return {
    isAuthenticated,
    user,
  }
}

/**
 * Type for authenticated user data
 * Extend this interface when implementing real authentication
 */
export interface AuthUser {
  name: string
  avatarUrl?: string
}
