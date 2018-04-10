import React, {Component} from "react";
import {UsersItemComponent} from "./list_item";

class UserList extends Component {

    render() {
        let code;
        if (this.props.users.length === 0) {
            code = <p>Nothing to show</p>
        } else {
            code = this.props.users.map(user => UserList.createListItem(user));
        }

        return code;
    }

    static createListItem(user) {
        return(
            <UsersItemComponent key={user.id} user={user}/>
        )
    }

}

export const UsersListComponent = UserList;