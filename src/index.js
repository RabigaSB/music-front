import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

import App from './App';
import musicReducer from './store/reducers/reducer-music';

import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware, ConnectedRouter} from 'connected-react-router';

const history = createBrowserHistory();

const middleware = [
	thunkMiddleware,
	routerMiddleware(history)
];


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	music: musicReducer,
	router: connectRouter(history)
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

const app = (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App/>
		</ConnectedRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
