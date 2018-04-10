import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
    selectIsAdmin,
    selectIsAuthenticated,
    signOut,
    selectAccountData
} from "../../modules/account/account";
import {bindActionCreators} from "redux";

class NavigationBar extends Component {

    render() {
        const {
            user,
            isAdmin,
            isAuthenticated,
        } = this.props;

        return(
            <div>
                {isAdmin &&
                <Link to={"/users"}>Users</Link>}

                {isAuthenticated &&
                <Link to={"/client/register_client"}>Register Client</Link>}

                {isAuthenticated &&
                <button onClick={this.props.actions.signOut}><Link to={"/"}>Sign Out</Link></button>}

                {isAuthenticated &&
                <Link to={"/user/change_password"}>Change Password</Link>}

                {!isAuthenticated &&
                <Link to={"/user/sign_in"}>Sign In</Link>}

                {isAuthenticated &&
                <Link to={"/clients"}>Clients</Link>}

                {isAuthenticated &&
                <p>Signed in as {user.login}</p>}
            </div>
        )
    }
}

export const Navigation = connect(
    (state) => ({
        user: selectAccountData(state),
        isAdmin: selectIsAdmin(state),
        isAuthenticated: selectIsAuthenticated(state)
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            signOut
        }, dispatch)
    })
)(NavigationBar);