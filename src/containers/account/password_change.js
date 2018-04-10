import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changePassword} from "../../modules/account/account";
import {PasswordChangeForm} from "../../components/user/password_change_form"

class PasswordChangeContainer extends Component {

    handleChangePassword(data) {
        this.props.actions.changePassword(data);
    }

    render() {
        return(
            <div>
                <h3>Change Password</h3>
                <PasswordChangeForm processSubmit={this.handleChangePassword.bind(this)} />
            </div>
        )
    }
}

export const PasswordChange = connect(
    (state) => ({ }),
    (dispatch) => ({
        actions: bindActionCreators({
            changePassword
        }, dispatch)
    })
)(PasswordChangeContainer);