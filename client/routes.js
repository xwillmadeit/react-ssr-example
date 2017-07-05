import { fetchUsersIfNeeded } from './actions/users'
import { fetchUserIfNeeded } from './actions/user'
import HomePage from './components/Home'
import UserInfoPage from './components/UserInfo'
import NotFoundPage from './components/NotFound'

export default [
  {
    path: '/',
    exact: true,
    component: HomePage,
    loadData: dispatch => Promise.all([dispatch(fetchUsersIfNeeded())])
  },
  {
    path: '/UserInfo/:id',
    component: UserInfoPage,
    loadData: (dispatch, params) =>
      Promise.all([dispatch(fetchUserIfNeeded(params.id))])
  },
  {
    path: '*',
    component: NotFoundPage
  }
]
