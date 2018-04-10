import React from 'react';
import ReactDOM from 'react-dom';
import {history, store} from "./store";
import {Provider} from "react-redux";
import {routes} from "./routes";
import {ConnectedRouter} from "react-router-redux";
import {Root} from "./containers/app/root";

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Root />
                {routes}
            </div>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
