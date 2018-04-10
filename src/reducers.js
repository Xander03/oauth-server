import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";

import {reducer as accountReducer} from "./modules/account/account";
import {reducer as usersReducer} from "./modules/user/users";
import {reducer as clientReducer} from "./modules/client/client";
import {reducer as clientsReducer} from "./modules/client/clients";
import {reducer as userReducer} from "./modules/user/user";
import {reducer as rolesReducer} from "./modules/user/user_roles";

const containersReducer = {
    containers: combineReducers({
        account: accountReducer,
        users: combineReducers({
            list: usersReducer,
            target: combineReducers({
                user: userReducer,
                roles: rolesReducer
            })
        }),
        clients: combineReducers({
            list: clientsReducer,
            target: clientReducer
        })
    })
};

const globalReducer =
    combineReducers({
        ...containersReducer,
        routing: routerReducer,
    })
;

export default globalReducer;