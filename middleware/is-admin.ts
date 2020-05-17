import { Middleware } from '@nuxt/types'
import { UserRole } from '~/types/UserRole'

const isAdmin: Middleware = ({ $auth, redirect }) => {
  if (!($auth.user.role >= UserRole.admin)) {
    return redirect('/')
  }
}

export default isAdmin
