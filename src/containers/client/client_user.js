import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {UserViewComponent} from "../../components/user/view";
import {getUserRoles, selectRolesData} from "../../modules/user/user_roles";
import {getUser, selectUserData} from "../../modules/user/user";
import {selectClientData} from "../../modules/client/client";

class ClientUserViewContainer extends Component {
    componentWillMount() {
        const body =`{user_id: ${this.props.match.params.id}, client_id: ${this.props.client.id}}`;

        this.props.actions.getUser(body);
        this.props.actions.getUserRoles({
            url: "/client/get_roles",
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

export const ClientUserView = connect(
    (state) => ({
        client: selectClientData(state),
        user: selectUserData(state),
        roles: selectRolesData(state)
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            getUser,
            getUserRoles
        }, dispatch)
    })
)(ClientUserViewContainer);