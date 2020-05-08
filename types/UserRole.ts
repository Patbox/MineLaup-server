export type IUserRole = 'superadmin' | 'admin' | 'moderator' | 'user'

export const UserRole: { [id: string]: IUserRole } = {
  superadmin: 'superadmin',
  admin: 'admin',
  moderator: 'moderator',
  user: 'user',
}
