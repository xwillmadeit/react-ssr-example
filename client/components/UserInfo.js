import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as action from '../actions/user'
import UserCard from './UserCard'

export class UserInfo extends Component {
  componentDidMount() {
    const { fetchUserIfNeeded, match: { params } } = this.props

    fetchUserIfNeeded(params.id)
  }

  renderUserCard = () => {
    const { userInfo, match: { params } } = this.props
    const userInfoById = userInfo[params.id]

    if (!userInfoById || userInfoById.readyStatus === action.USER_REQUESTING) {
      return <p>Loading...</p>
    }

    if (userInfoById.readyStatus === action.USER_FAILURE) {
      return <p>Oops, Failed to load info!</p>
    }

    return <UserCard info={userInfoById.info} />
  }

  render() {
    return (
      <div>
        {this.renderUserCard()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserIfNeeded: id => {
      dispatch(action.fetchUserIfNeeded(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
