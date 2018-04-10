import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadAccount} from "../../modules/account/account";
import {Navigation} from "./navigation_bar";

class RootContainer extends Component {
    componentWillMount() {
        this.props.actions.loadAccount();
    }

    render() {
        return(
            <div>
                <Navigation />
            </div>
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