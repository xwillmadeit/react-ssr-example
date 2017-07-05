import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as action from '../actions/users'
import UserList from './UserList'

export class Home extends PureComponent {
  componentDidMount() {
    this.props.fetchUsersIfNeeded()
  }

  renderUserList = () => {
    const { home } = this.props

    if (
      !home.readyStatus ||
      home.readyStatus === action.USERS_INVALID ||
      home.readyStatus === action.USERS_REQUESTING
    ) {
      return <p>Loading...</p>
    }

    if (home.readyStatus === action.USERS_FAILURE) {
      return <p>Oops, Failed to load list!</p>
    }

    return <UserList list={home.list} />
  }

  render() {
    return (
      <div>
        {this.renderUserList()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    home: state.home
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsersIfNeeded: () => {
      dispatch(action.fetchUsersIfNeeded())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
