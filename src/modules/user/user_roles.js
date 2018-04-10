import {fromJS} from "immutable";
import {API_URI} from "../../settings";
import {getAuthenticatedHeaders} from "../../utils/headers";
import {put, call, takeEvery} from "redux-saga/effects";
import axios from "axios";

const GET_USER_ROLES_REQUEST = "GET_USER_ROLES_REQUEST";
const GET_USER_ROLES_SUCCESS = "GET_USER_ROLES_SUCCESS";
const GET_USER_ROLES_FAILED = "GET_USER_ROLES_FAILED";

const initialState = fromJS({
    roles: [],
    loading: false,
    error: null
});

export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_USER_ROLES_REQUEST:
            return state
                .set("loading", true)
                .set("error", null);

        case GET_USER_ROLES_SUCCESS:
            return state
                .set("loading", false)
                .set("roles", action.payload);

        case GET_USER_ROLES_FAILED:
            return state
                .set("loading", false)
                .set("error", action.payload);

        default:
            return state;

    }
};

export const getUserRoles = (data) => ({
    type: GET_USER_ROLES_REQUEST,
    payload: data
});

export const getUserRolesSuccess = (data) => ({
    type: GET_USER_ROLES_SUCCESS,
    payload: data
});

export const getUserRolesFailed = (error) => ({
    type: GET_USER_ROLES_FAILED,
    payload: error
});

function* getUserRolesRequest(action) {
    try {
        const response = yield call(axios, API_URI + action.payload.url, {
            method: "POST",
            data: action.payload.body,
            headers: getAuthenticatedHeaders()
        });

        yield put(getUserRolesSuccess(response.data.map(role => role.name)));
    } catch (e) {
        yield put(getUserRolesFailed(e));
    }
}

export function* watchUserRolesActions() {
    yield takeEvery(GET_USER_ROLES_REQUEST, getUserRolesRequest);
}

export const selectRolesContainer = (state) => state.containers.users.target.roles;
export const selectRolesData = (state) => selectRolesContainer(state).get("roles");