import type { RoleEnum } from './role-enum'

export interface UserRole {
  id: string
  name: RoleEnum
  permissions: string[]
}
