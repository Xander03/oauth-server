import {fromJS} from "immutable";
import {call, put, takeLatest, takeEvery} from "redux-saga/effects";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {API_URI} from "../../settings";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookies";
import {push} from "react-router-redux";
import {getAuthenticatedHeaders} from "../../utils/headers";

const ENDPOINT_USER = API_URI + "/user";
const TOKEN_NAME = "token";

const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
const SIGN_UP_ERROR = "SIGN_UP_ERROR";

const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
const SIGN_IN_ERROR = "SIGN_IN_ERROR";

const LOAD_ACCOUNT_REQUEST = "LOAD_ACCOUNT_REQUEST";
const LOAD_ACCOUNT_SUCCESS = "LOAD_ACCOUNT_SUCCESS";
const LOAD_ACCOUNT_FAILED = "LOAD_ACCOUNT_FAILED";

const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST";
const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
const SIGN_OUT_ERROR = "SIGN_OUT_ERROR";

const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
const CHANGE_PASSWORD_FAILED = "CHANGE_PASSWORD_FAILED";

const CLEAR_ACCOUNT_DATA = "CLEAR_ACCOUNT_DATA";

const initialState = fromJS({
    user: {
        login: "guest",
    },
    roles: ["GUEST"],
    authenticated: false,
    loading: false,
    error: null
});

export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case SIGN_UP_REQUEST:
            return state
                .set("loading", true)
                .set("error", null);

        case SIGN_UP_SUCCESS:
            return state
                .set("loading", false);

        case SIGN_UP_ERROR:
            return state
                .set("loading", false)
                .set("error", action.payload);


        case SIGN_IN_REQUEST:
            return state
                .set("loading", true)
                .set("error", null);

        case SIGN_IN_SUCCESS:
            return state
                .set("loading", false);

        case SIGN_IN_ERROR:
            return state
                .set("loading", false)
                .set("error", action.payload);


        case LOAD_ACCOUNT_REQUEST:
            return state
                .set("loading", true)
                .set("error", null);

        case LOAD_ACCOUNT_SUCCESS:
            return state
                .set("user", {
                    id: action.payload.id,
                    login: action.payload.login
                })
                .set("roles", action.payload.roles)
                .set("authenticated", true)
                .set("loading", false);

        case LOAD_ACCOUNT_FAILED:
            return state
                .set("user", {
                    login: "guest"
                })
                .set("roles", ["GUEST"])
                .set("authenticated", false)
                .set("loading", false)
                .set("error", action.payload);


        case SIGN_OUT_REQUEST:
            return state
                .set("loading", true)
                .set("error", null);

        case SIGN_OUT_SUCCESS:
            return initialState;

        case SIGN_OUT_ERROR:
            return state
                .set("loading", false)
                .set("error", action.payload);


        case CHANGE_PASSWORD_REQUEST:
            return state
                .set("loading", true)
                .set("error", null);

        case CHANGE_PASSWORD_SUCCESS:
            return state
                .set("loading", false);

        case CHANGE_PASSWORD_FAILED:
            return state
                .set("loading", false)
                .set("error", action.payload);


        case CLEAR_ACCOUNT_DATA:
            return initialState;

        default:
            return state;

    }
};


export const signUp = (data) => ({
    type: SIGN_UP_REQUEST,
    payload: data
});

export const signUpSuccess = (data) => ({
    type: SIGN_UP_SUCCESS,
    payload: data
});

export const signUpError = (error) => ({
    type: SIGN_UP_ERROR,
    payload: error
});


export const signIn = (data) => ({
    type: SIGN_IN_REQUEST,
    payload: data
});

export const signInSuccess = (data) => ({
    type: SIGN_IN_SUCCESS,
    payload: data
});

export const signInError = (error) => ({
    type: SIGN_IN_ERROR,
    payload: error
});


export const loadAccount = (data) => ({
    type: LOAD_ACCOUNT_REQUEST,
    payload: data
});

export const loadAccountSuccess = (data) => ({
    type: LOAD_ACCOUNT_SUCCESS,
    payload: data
});

export const loadAccountFailed = (error) => ({
    type: LOAD_ACCOUNT_FAILED,
    payload: error
});


export const signOut = () => ({
   type: SIGN_OUT_REQUEST
});

export const signOutSuccess = () => ({
   type: SIGN_OUT_SUCCESS
});

export const signOutError = (error) => ({
   type: SIGN_OUT_ERROR,
   payload: error
});


export const changePassword = (data) => ({
    type: CHANGE_PASSWORD_REQUEST,
    payload: data
});

export const changePasswordSuccess = (data) => ({
    type: CHANGE_PASSWORD_SUCCESS,
    payload: data
}) ;

export const changePasswordFailed = (error) => ({
   type: CHANGE_PASSWORD_FAILED,
   payload: error
});


export const clearAccountData = () => ({
    type: CLEAR_ACCOUNT_DATA
});


function* signUpRequest(action) {
    try {
        const body = `{login: "${action.payload.login}", password: "${action.payload.password}"}`;

        const response = yield call(axios, ENDPOINT_USER + "/sign_up", {
            method: "POST",
            data: body
        });
        setCookie(TOKEN_NAME, response.data);

        yield put(signUpSuccess(response.data));
    } catch (e) {
        yield put(signUpError(e));
    }
}

function* singInRequest(action) {
    try {
        const body = `{login: "${action.payload.login}", password: "${action.payload.password}"}`;

        const response = yield call(axios, ENDPOINT_USER + "/sign_in", {
            method: "POST",
            data: body
        });
        setCookie(TOKEN_NAME, response.data);

        yield put(signInSuccess(response.data));
    } catch (e) {
        yield put(signInError(e));
    }
}

function* loadAccountRequest() {
    try {
        const token = getCookie(TOKEN_NAME);
        const parsedToken = jwt_decode(token);
        yield put(loadAccountSuccess(parsedToken));
    } catch (e) {
        yield put(loadAccountFailed(e));
    }
}

function* signOutRequest() {
    try {
        if (getCookie(TOKEN_NAME)) {
            deleteCookie(TOKEN_NAME);
        } else {
            yield put(signOutError("Sign in first"));
        }
        yield put(signOutSuccess());
    } catch (e) {
        yield put(signOutError(e));
    }
}

function* handleSignUpSuccess(action) {
    yield put(loadAccount(action.payload))
}

function* handleSignInSuccess(action) {
    yield put(loadAccount(action.payload));
}

function* handleSignOutSuccess() {
    yield put(push("/"));
}

function* handleLoadAccountSuccess() {
    // yield put(push("/"));
}


function* changePasswordRequest(action) {
    try {
        const response = yield call(axios, ENDPOINT_USER + "/change_password", {
            method: "POST",
            data: `{password: "${action.payload.password}", new_password: "${action.payload.new_password}"}`,
            headers: getAuthenticatedHeaders()
        });

        yield put(changePasswordSuccess(response.data));
    } catch (e) {
        yield put(changePasswordFailed(e));
    }
}

function* handleChangePasswordSuccess() {
    yield put(push("/"));
}


export function* watchAccountActions() {
    yield takeLatest(SIGN_UP_REQUEST, signUpRequest);
    yield takeEvery(SIGN_IN_REQUEST, singInRequest);
    yield takeEvery(LOAD_ACCOUNT_REQUEST, loadAccountRequest);
    yield takeEvery(SIGN_OUT_REQUEST, signOutRequest);
    yield takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordRequest);

    yield takeEvery(SIGN_UP_SUCCESS, handleSignUpSuccess);
    yield takeEvery(SIGN_IN_SUCCESS, handleSignInSuccess);
    yield takeEvery(LOAD_ACCOUNT_SUCCESS, handleLoadAccountSuccess);
    yield takeEvery(SIGN_OUT_SUCCESS, handleSignOutSuccess);
    yield takeEvery(CHANGE_PASSWORD_SUCCESS, handleChangePasswordSuccess);
}

export const selectAccountContainer = (state) => state.containers.account;
export const selectAccountData = (state) => selectAccountContainer(state).get("user");
export const selectIsAuthenticated = (state) => selectAccountContainer(state).get("authenticated");
export const selectIsRole = (state, role) => selectAccountContainer(state).get("roles").indexOf(role) > -1;
export const selectIsAdmin = (state) => selectIsRole(state, "ADMIN");