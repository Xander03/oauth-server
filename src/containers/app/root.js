import React, {Component} from "react";
import {connect} from "react-redux";
import {loadAccount} from "../../modules/account/account";
import {bindActionCreators} from "redux";
import {ConnectedRouter} from "react-router-redux";
import {Navigation} from "./navigation_bar";
import {routes} from "../../routes";
import {history} from "../../store";

class RootContainer extends Component {
    componentWillMount() {
        this.props.actions.loadAccount();
    }

    render() {
        return(
            <ConnectedRouter history={history}>
                <div>
                    <Navigation />
                    {routes}
                </div>
            </ConnectedRouter>
        )
    }
}

export const Root = connect(
    (state) => ({ }),
    (dispatch) => ({
        actions: bindActionCreators({
            loadAccount
        }, dispatch)
    })
)(RootContainer);