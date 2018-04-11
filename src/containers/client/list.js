import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {clearClientsData, getClients, selectClientsData} from "../../modules/client/clients";
import {ClientsListComponent} from "../../components/client/list";

class ClientsListContainer extends Component {

    componentWillMount() {
        this.props.actions.getClients();
    }

    componentWillUnmount() {
        this.props.actions.clearClientsData();
    }

    render() {
        return(
            <div>
                <h3>Clients List</h3>
                <ClientsListComponent clients={this.props.clients} />
            </div>
        )
    }

}

export const ClientsList = connect(
    (state) => ({
        clients: selectClientsData(state),
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            getClients,
            clearClientsData
        }, dispatch)
    })
)(ClientsListContainer);