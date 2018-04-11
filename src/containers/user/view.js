import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {UserViewComponent} from "../../components/user/view";
import {getUserRoles, selectRolesData} from "../../modules/user/user_roles";
import {deleteUser, getUser, selectUserData} from "../../modules/user/user";
import {clearUsersData} from "../../modules/user/users";
import {selectIsAdmin} from "../../modules/account/account";

class UserViewContainer extends Component {
    componentWillMount() {
        const body =`{user_id: ${this.props.match.params.id}}`;
        const url = this.props.url ? this.props.url : "/user/get_roles";

        this.props.actions.getUser(body);
        this.props.actions.getUserRoles({
            url: url,
            body: body
        });
    }

    componentWillUnmount() {
        this.props.actions.clearUsersData();
    }

    handleDelete() {
        this.props.actions.deleteUser(this.props.user.id);
    }

    render() {
        const {
            isAdmin,
            user,
            roles
        } = this.props;

        return(
            <div>
                <UserViewComponent
                    user={user}
                    roles={roles}
                />
                {
                    isAdmin &&
                    <button onClick={this.handleDelete.bind(this)}>Delete</button>
                }
            </div>
        )
    }
}

export const UserView = connect(
    (state) => ({
        isAdmin: selectIsAdmin(state),
        user: selectUserData(state),
        roles: selectRolesData(state)
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            getUser,
            deleteUser,
            getUserRoles,
            clearUsersData
        }, dispatch)
    })
)(UserViewContainer);