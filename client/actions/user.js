import axios from 'axios'

export const USER_REQUESTING = 'USER_REQUESTING'
export const USER_FAILURE = 'USER_FAILURE'
export const USER_SUCCESS = 'USER_SUCCESS'

export const API_URL = 'https://jsonplaceholder.typicode.com/users'

export const fetchUser = userId => dispatch => {
  dispatch({ type: USER_REQUESTING, userId })

  return axios
    .get(`${API_URL}/${userId}`)
    .then(res => {
      dispatch({ type: USER_SUCCESS, userId, data: res.data })
    })
    .catch(err => {
      dispatch({ type: USER_FAILURE, userId, err })
    })
}

const shouldFetchUser = (state, userId) => {
  if (__DEV__) return true

  const userInfo = state.userInfo[userId]

  if (userInfo && userInfo.readyStatus === USER_SUCCESS) return false

  return true
}

export const fetchUserIfNeeded = userId => (dispatch, getState) => {
  if (shouldFetchUser(getState(), userId)) {
    return dispatch(fetchUser(userId))
  }

  return null
}
