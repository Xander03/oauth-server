import React, {Component} from "react";
import {Link} from "react-router-dom";

class ClientsItem extends Component {
    render() {
        return(
            <Link to={"/clients/" + this.props.client.id}>
                <div>
                    <p>{this.props.client.name}</p>
                    <p>{this.props.client.client_id}</p>
                </div>
            </Link>
        )
    }
}

export const ClientsItemComponent = ClientsItem;