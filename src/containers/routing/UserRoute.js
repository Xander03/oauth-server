import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {selectIsAuthenticated} from "../../modules/account/account";

class UserRouteContainer extends Component {
    render() {
        const {
            isAuthenticated,
            component,
            ...rest
        } = this.props;

        return(
            <Route
                {...rest}
                render={props =>
                    isAuthenticated
                        ? <Route {...props} component={component}/>
                        : <Redirect to={"/user/sign_in"}/>
                }
            />
        )
    }
}

export const UserRoute = connect(
    (state) => ({
        isAuthenticated: selectIsAuthenticated(state)
    })
)(UserRouteContainer);