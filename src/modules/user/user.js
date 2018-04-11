import {fromJS} from "immutable";
import {API_URI} from "../../settings";
import {getAuthenticatedHeaders} from "../../utils/headers";
import {call, put, takeEvery} from "redux-saga/effects";
import {goBack} from "react-router-redux";
import axios from "axios";

const ENDPOINT_USER = API_URI + "/user";

const GET_USER_REQUEST = "GET_USER_REQUEST";
const GET_USER_SUCCESS = "GET_USER_SUCCESS";
const GET_USER_FAILED = "GET_USER_FAILED";

const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
const DELETE_USER_FAILED = "DELETE_USER_FAILED";

const CLEAR_USER_DATA = "CLEAR_USER_DATA";

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


        case DELETE_USER_REQUEST:
            return state
                .set("loading", false)
                .set("error", null);

        case DELETE_USER_SUCCESS:
            return initialState;

        case DELETE_USER_FAILED:
            return state
                .set("loading", false)
                .set("error", action.payload);


        case CLEAR_USER_DATA:
            return initialState;

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


export const deleteUser = (data) => ({
    type: DELETE_USER_REQUEST,
    payload: data
});

export const deleteUserSuccess = () => ({
    type: DELETE_USER_SUCCESS
});

export const deleteUserFailed = (error) => ({
    type: DELETE_USER_FAILED,
    payload: error
});


export const clearUserData = () => ({
    type: CLEAR_USER_DATA
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


function* deleteUserRequest(action) {
    try {
        yield call(axios, ENDPOINT_USER + "/delete_user", {
            method: "POST",
            data: {user_id: action.payload},
            headers: getAuthenticatedHeaders()
        });

        yield put(deleteUserSuccess());
    } catch (e) {
        yield put(deleteUserFailed(e));
    }
}

function* handleDeleteUserSuccess() {
    yield put(goBack());
}


export function* watchUserActions() {
    yield takeEvery(GET_USER_REQUEST, getUserRequest);
    yield takeEvery(DELETE_USER_REQUEST, deleteUserRequest);

    yield takeEvery(DELETE_USER_SUCCESS, handleDeleteUserSuccess);
}

export const selectUserContainer = (state) => state.containers.users.target.user;
export const selectUserData = (state) => selectUserContainer(state).get("user");