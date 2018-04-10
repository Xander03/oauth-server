import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {UserViewComponent} from "../../components/user/view";
import {getUserRoles, selectRolesData} from "../../modules/user/user_roles";
import {getUser, selectUserData} from "../../modules/user/user";

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

    render() {
        return(
            <UserViewComponent
                user={this.props.user}
                roles={this.props.roles}
            />
        )
    }
}

export const UserView = connect(
    (state) => ({
        user: selectUserData(state),
        roles: selectRolesData(state)
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            getUser,
            getUserRoles
        }, dispatch)
    })
)(UserViewContainer);