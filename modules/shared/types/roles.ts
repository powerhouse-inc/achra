import type { RoleEnum } from '../enums/roleEnum'

export interface UserRole {
  id: string
  name: RoleEnum
  permissions: string[]
}
