import React, {Component} from "react";

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