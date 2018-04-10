import React from "react";
import {Switch, Route} from "react-router-dom";

import {UserRoute} from "./containers/routing/UserRoute";
import {AdminRoute} from "./containers/routing/AdminRoute";

import {RegisterClient} from "./containers/client/register_form";
import {PageForSign} from "./containers/account/unauthenticated";
import {UsersList} from "./containers/user/list";
import {PasswordChange} from "./containers/account/password_change";
import {ClientsList} from "./containers/client/list";
import {Client} from "./containers/client/view";
import {UserView} from "./containers/user/view";
import {ClientUserView} from "./containers/client/client_user";

export const routes =
    <Switch>

        <Route exact path="/user/sign_in" component={PageForSign}/>

        <UserRoute exact path="/user/change_password" component={PasswordChange}/>
        <AdminRoute exact path="/users" component={UsersList}/>
        <AdminRoute exact path="/users/:id" component={UserView}/>

        <UserRoute exact path="/clients" component={ClientsList}/>
        <UserRoute exact path="/clients/:id" component={Client}/>
        <UserRoute exact path="/clients/users/:id" component={ClientUserView}/>
        <UserRoute exact path="/client/register_client" component={RegisterClient}/>

    </Switch>;
