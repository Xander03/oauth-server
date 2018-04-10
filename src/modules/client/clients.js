import {fromJS} from "immutable";
import axios from "axios";
import {getAuthenticatedHeaders} from "../../utils/headers";
import {put, call, takeEvery} from "redux-saga/effects";
import {API_URI} from "../../settings";

const ENDPOINT_CLIENTS = API_URI + "/client";

const GET_CLIENTS_REQUEST = "GET_CLIENTS_REQUEST";
const GET_CLIENTS_SUCCESS = "GET_CLIENTS_SUCCESS";
const GET_CLIENTS_FAILED = "GET_CLIENTS_FAILED";

const initialState = fromJS({
    clients: [],
    loading: false,
    error: null
});

export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_CLIENTS_REQUEST:
            return state
                .set("loading", true)
                .set("error", null);

        case GET_CLIENTS_SUCCESS:
            return state
                .set("clients", action.payload)
                .set("loading", false);

        case GET_CLIENTS_FAILED:
            return state
                .set("loading", false)
                .set("error", action.payload);

        default:
            return state;

    }
};

export const getClients = () => ({
    type: GET_CLIENTS_REQUEST
});

export const getClientsSuccess = (data) => ({
    type: GET_CLIENTS_SUCCESS,
    payload: data
});

export const getClientsFailed = (error) => ({
    type: GET_CLIENTS_FAILED,
    payload: error
});

function* getClientsRequest() {
    try {
        const response = yield call(axios, ENDPOINT_CLIENTS + "/get_clients", {
            method: "GET",
            headers: getAuthenticatedHeaders()
        });

        yield put(getClientsSuccess(response.data));
    } catch (e) {
        yield put(getClientsFailed(e));
    }
}

export function* watchClientsActions() {
    yield takeEvery(GET_CLIENTS_REQUEST, getClientsRequest);
}

export const selectClientsContainer = (state) => state.containers.clients.list;
export const selectClientsData = (state) => selectClientsContainer(state).get("clients");