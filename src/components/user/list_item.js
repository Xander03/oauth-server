import React, {Component} from "react";
import {Link} from "react-router-dom";

class UsersItem extends Component {
    render() {
        return(
            <div>
                <Link to={"users/" + this.props.user.id}>
                    {this.props.user.login}
                </Link>
            </div>
        )
    }
}

export const UsersItemComponent = UsersItem;