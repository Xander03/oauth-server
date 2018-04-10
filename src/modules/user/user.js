import {fromJS} from "immutable";
import {API_URI} from "../../settings";
import {getAuthenticatedHeaders} from "../../utils/headers";
import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";

const ENDPOINT_USER = API_URI + "/user";

const GET_USER_REQUEST = "GET_USER_REQUEST";
const GET_USER_SUCCESS = "GET_USER_SUCCESS";
const GET_USER_FAILED = "GET_USER_FAILED";

const initialState = fromJS({
    user: {},
    loading: false,
    error: null
});

export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_USER_REQUEST:
            return state
                .set("loading", true)
                .set("error", null);

        case GET_USER_SUCCESS:
            return state
                .set("user", action.payload)
                .set("loading", false);

        case GET_USER_FAILED:
            return state
                .set("loading", false)
                .set("error", null);

        default:
            return state;

    }
};

export const getUser = (data) => ({
    type: GET_USER_REQUEST,
    payload: data
});

export const getUserSuccess = (data) => ({
    type: GET_USER_SUCCESS,
    payload: data
});

export const getUserFailed = (error) => ({
    type: GET_USER_FAILED,
    payload: error
});

function* getUserRequest(action) {
    try {
        const response = yield call(axios, ENDPOINT_USER + "/get", {
            method: "POST",
            data: action.payload,
            headers: getAuthenticatedHeaders()
        });

        yield put(getUserSuccess(response.data));
    } catch (e) {
        yield put(getUserFailed(e));
    }
}

export function* watchUserActions() {
    yield takeEvery(GET_USER_REQUEST, getUserRequest);
}

export const selectUserContainer = (state) => state.containers.users.target.user;
export const selectUserData = (state) => selectUserContainer(state).get("user");