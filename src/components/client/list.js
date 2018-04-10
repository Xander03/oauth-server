import React, {Component} from "react";
import {ClientsItemComponent} from "./list_item";

class ClientsList extends Component {

    render() {
        let code;
        if (this.props.clients.length === 0) {
            code = <p>No clients found</p>;
        } else {
            code = this.props.clients.map(client => ClientsList.createListItem(client));
        }

        return code;
    }

    static createListItem(client) {
        return <ClientsItemComponent key={client.id} client={client}/>
    }
}

export const ClientsListComponent = ClientsList;