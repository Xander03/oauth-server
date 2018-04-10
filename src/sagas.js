import {fork, all} from "redux-saga/effects";
import {watchAccountActions} from "./modules/account/account";
import {watchUsersActions} from "./modules/user/users";
import {watchClientActions} from "./modules/client/client";
import {watchClientsActions} from "./modules/client/clients";
import {watchUserRolesActions} from "./modules/user/user_roles";
import {watchUserActions} from "./modules/user/user";

const sagas = [
    watchAccountActions,
    watchUsersActions,
    watchClientActions,
    watchClientsActions,
    watchUserRolesActions,
    watchUserActions
];

export default function* globalSagas() {
    const globalSagasForks = sagas.map(saga => fork(saga));

    yield all([...globalSagasForks]);
}