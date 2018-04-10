import {fromJS} from "immutable";
import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";
import {API_URI} from "../../settings";
import {getAuthenticatedHeaders} from "../../utils/headers";

const GET_ALL_REQUEST = "GET_ALL_REQUEST";
const GET_ALL_SUCCESS = "GET_ALL_SUCCESS";
const GET_ALL_ERROR = "GET_ALL_ERROR";

const initialState = fromJS({
    users: [],
    loading: false,
    error: null
});

export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_REQUEST:
            return state
                .set("loading", true)
                .set("error", null);

        case GET_ALL_SUCCESS:
            return state
                .set("users", action.payload)
                .set("loading", false);

        case GET_ALL_ERROR:
            return state
                .set("loading", false)
                .set("error", action.payload);

        default:
            return state;
    }
};

export const getAllUsers = (data) => ({
    type: GET_ALL_REQUEST,
    payload: data
});

export const getAllUsersSuccess = (data) => ({
    type: GET_ALL_SUCCESS,
    payload: data
});

export const getAllUsersError = (error) => ({
   type: GET_ALL_ERROR,
   payload: error
});

function* getAllUsersRequest(action) {
    try {
        const response = yield call(axios, API_URI + action.payload.url, {
            method: "POST",
            data: action.payload.body,
            headers: getAuthenticatedHeaders()
        });

        yield put(getAllUsersSuccess(response.data));
    } catch (e) {
        yield put(getAllUsersError(e));
    }
}

export function* watchUsersActions() {
    yield takeEvery(GET_ALL_REQUEST, getAllUsersRequest);
}

export const selectUsersContainer = (state) => state.containers.users.list;
export const selectUsersData = (state) => selectUsersContainer(state).get("users");