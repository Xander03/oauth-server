import React, {Component} from "react";
import {connect} from "react-redux";
import {getAllUsers, selectUsersData} from "../../modules/user/users";
import {bindActionCreators} from "redux";
import {UsersListComponent} from "../../components/user/list";

class ClientUsersListContainer extends Component {

    componentWillMount() {
        this.props.actions.getAllUsers({
            url: "/client/get_users",
            body: `{client_id: ${this.props.client_id}}`
        });
    }

    render() {
        return(
            <div>
                <h3>Client Users</h3>
                <UsersListComponent users={this.props.users} />
            </div>
        )
    }

}

export const ClientUsersList = connect(
    (state) => ({
        users: selectUsersData(state)
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            getAllUsers,
        }, dispatch)
    })
)(ClientUsersListContainer);