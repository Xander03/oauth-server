import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {createClient} from "../../modules/client/client";
import {RegisterClientForm} from "../../components/client/register_form";

class RegisterClientContainer extends Component {

    handleRegisterClient(data) {
        this.props.actions.createClient(data);
    }

    render() {
        return(
            <div>
                <h3>Register Client</h3>
                <RegisterClientForm processSubmit={this.handleRegisterClient.bind(this)}/>
            </div>
        )
    }
}

export const RegisterClient = connect(
    (state) => ({

    }),
    (dispatch) => ({
        actions: bindActionCreators({
            createClient
        }, dispatch)
    })
)(RegisterClientContainer);