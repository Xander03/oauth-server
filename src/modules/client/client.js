import {fromJS} from "immutable";
import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";
import {API_URI} from "../../settings";
import {getAuthenticatedHeaders} from "../../utils/headers";

const ENDPOINT_CLIENT = API_URI + "/client";

const CREATE_CLIENT_REQUEST = "CREATE_CLIENT_REQUEST";
const CREATE_CLIENT_SUCCESS = "CREATE_CLIENT_SUCCESS";
const CREATE_CLIENT_FAILED = "CREATE_CLIENT_FAILED";

const GET_CLIENT_BY_ID_REQUEST = "GET_CLIENT_BY_ID_REQUEST";
const GET_CLIENT_BY_ID_SUCCESS = "GET_CLIENT_BY_ID_SUCCESS";
const GET_CLIENT_BY_ID_FAILED = "GET_CLIENT_BY_ID_FAILED";

const initialState = fromJS({
    client: {},
    loading: false,
    error: null
});

export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case CREATE_CLIENT_REQUEST:
            return state
                .set("loading", true)
                .set("error", null);

        case CREATE_CLIENT_SUCCESS:
            return state
                .set("client", action.payload)
                .set("loading", false);

        case CREATE_CLIENT_FAILED:
            return state
                .set("loading", false)
                .set("error", action.payload);


        case GET_CLIENT_BY_ID_REQUEST:
            return state
                .set("loading", true)
                .set("error", null);

        case GET_CLIENT_BY_ID_SUCCESS:
            return state
                .set("client", action.payload)
                .set("loading", false);

        case GET_CLIENT_BY_ID_FAILED:
            return state
                .set("loading", false)
                .set("error", action.payload);

        default:
            return state;
    }
};

export const createClient = (data) => ({
    type: CREATE_CLIENT_REQUEST,
    payload: data
});

export const createClientSuccess = (data) => ({
    type: CREATE_CLIENT_SUCCESS,
    payload: data
});

export const createClientFailed = (error) => ({
    type: CREATE_CLIENT_FAILED,
    payload: error
});


export const getClientById = (data) => ({
    type: GET_CLIENT_BY_ID_REQUEST,
    payload: data
});

export const getClientByIdSuccess = (data) => ({
    type: GET_CLIENT_BY_ID_SUCCESS,
    payload: data
});

export const getClientByIdFailed = (error) => ({
   type: GET_CLIENT_BY_ID_FAILED,
   payload: error
});


function* createClientRequest(action) {
    try {
        const response = yield call(axios, ENDPOINT_CLIENT + "/register_client", {
            method: "POST",
            data: `{client_name: "${action.payload.client_name}"}`,
            headers: getAuthenticatedHeaders()
        });

        yield put(createClientSuccess(response.data));
    } catch (e) {
        yield put(createClientFailed(e));
    }
}


function* getClientByIdRequest(action) {
    try {
        const response = yield call(axios, ENDPOINT_CLIENT + "/get_by_id", {
            method: "POST",
            data: `{client_id: ${action.payload}}`,
            headers: getAuthenticatedHeaders()
        });

        yield put(getClientByIdSuccess(response.data));
    } catch (e) {
        yield put(getClientByIdFailed(e));
    }
}

export function* watchClientActions() {
    yield takeEvery(CREATE_CLIENT_REQUEST, createClientRequest);
    yield takeEvery(GET_CLIENT_BY_ID_REQUEST, getClientByIdRequest);
}

export const selectClientContainer = (state) => state.containers.clients.target;
export const selectClientData = (state) => selectClientContainer(state).get("client");