import React, {Component} from "react";
import {UsersListComponent} from "../user/list";

class Client extends Component {
    render() {
        return(
            <div>
                <h3>{this.props.client.name}</h3>
            </div>
        )
    }
}

export const ClientComponent = Client;