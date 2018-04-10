import React, {Component} from "react";

class RolesItem extends Component {
    render() {
        return(
            <div>
                <h5>{this.props.role}</h5>
            </div>
        )
    }
}

export const RolesItemComponent = RolesItem;