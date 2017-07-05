import axios from 'axios'

export const USERS_INVALID = 'USERS_INVALID'
export const USERS_REQUESTING = 'USERS_REQUESTING'
export const USERS_FAILURE = 'USERS_FAILURE'
export const USERS_SUCCESS = 'USERS_SUCCESS'

export const API_URL = 'https://jsonplaceholder.typicode.com/users'

export const fetchUsers = () => dispatch => {
  dispatch({ type: USERS_REQUESTING })

  return axios
    .get(API_URL)
    .then(res => {
      dispatch({ type: USERS_SUCCESS, data: res.data })
    })
    .catch(err => {
      dispatch({ type: USERS_FAILURE, err })
    })
}

const shouldFetchUsers = state => {
  if (__DEV__) return true

  const home = state.home

  if (home.readyStatus === USERS_SUCCESS) return false

  return true
}

export const fetchUsersIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchUsers(getState())) {
    return dispatch(fetchUsers())
  }
  return null
}
