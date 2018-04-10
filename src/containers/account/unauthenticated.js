import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    signIn,
    signUp
} from "../../modules/account/account";
import {SignForm} from "../../components/user/sign_form";

class AuthContainer extends Component {

    handleSignIn(data) {
        this.props.interaction.signIn({
            login: data.login,
            password: data.password
        });
    }

    handleSignUp(data) {
        this.props.interaction.signUp({
            login: data.login,
            password: data.password
        })
    }

    render() {
        return(
            <div>
                <label>SignIn</label>
                <SignForm
                    processSubmit={this.handleSignIn.bind(this)}
                />
                <label>SignUp</label>
                <SignForm
                    processSubmit={this.handleSignUp.bind(this)}
                />
            </div>
        )
    }

}

export const PageForSign = connect(
    (state) => ({ }),
    (dispatch) => ({
        interaction: bindActionCreators({
            signIn,
            signUp
        }, dispatch)
    })
)(AuthContainer);