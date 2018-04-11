import React, {Component} from "react";
import {connect} from "react-redux";
import {clearUsersData, getAllUsers, selectUsersData} from "../../modules/user/users";
import {bindActionCreators} from "redux";
import {UsersListComponent} from "../../components/user/list";

class UsersListContainer extends Component {

    componentWillMount() {
        this.props.actions.getAllUsers({
            url: "/user/get_all"
        });
    }

    componentWillUnmount() {
        this.props.actions.clearUsersData()
    }

    render() {
        return(
            <div>
                <h3>Users</h3>
                <UsersListComponent users={this.props.users} />
            </div>
        )
    }

}

export const UsersList = connect(
    (state) => ({
        users: selectUsersData(state)
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            getAllUsers,
            clearUsersData
        }, dispatch)
    })
)(UsersListContainer);