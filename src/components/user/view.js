import React, {Component} from "react";
import {RolesListComponent} from "../role/list";

class UserView extends Component {
    render() {
        return(
            <div>
                <h3>{this.props.user.login}</h3>
                <RolesListComponent roles={this.props.roles}/>
            </div>
        )
    }
}

export const UserViewComponent = UserView;