import React, {Component} from "react";
import {connect} from "react-redux";
import {getClientById, selectClientData} from "../../modules/client/client";
import {bindActionCreators} from "redux";
import {ClientComponent} from "../../components/client/view";
import {ClientUsersList} from "./client_users";

class ClientContainer extends Component {

    componentWillMount() {
        this.props.actions.getClientById(this.props.match.params.id);
    }

    render() {
        return(
            <div>
                <ClientComponent client={this.props.client} />
                <ClientUsersList client_id={this.props.match.params.id}/>
            </div>
        )
    }

}

export const Client = connect(
    (state) => ({
        client: selectClientData(state),
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            getClientById,
        }, dispatch)
    })
)(ClientContainer);