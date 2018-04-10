import React, {Component} from "react";
import {RolesItemComponent} from "./list_item";

class RolesList extends Component {
    render() {
        let code;
        if (this.props.roles.length === 0) {
            code = <p>Nothing to show</p>
        } else {
            code = this.props.roles.map((role, index) => RolesList.createListItem(role, index));
        }

        return code;
    }

    static createListItem(role, index) {
        return <RolesItemComponent key={index} role={role} />
    }
}

export const RolesListComponent = RolesList;