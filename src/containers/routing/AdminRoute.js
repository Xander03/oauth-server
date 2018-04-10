import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {selectIsAdmin} from "../../modules/account/account";

class AdminRouteContainer extends Component {
    render() {
        const {
            isAdmin,
            component,
            ...rest
        } = this.props;

        return(
            <Route
                {...rest}
                render={props =>
                    isAdmin
                        ? <Route {...props} component={component}/>
                        : <Redirect to={"/user/sign_in"}/>
                }
            />
        )
    }
}

export const AdminRoute = connect(
    (state) => ({
        isAdmin: selectIsAdmin(state)
    })
)(AdminRouteContainer);