import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

import App from './App';
import musicReducer from './store/reducers/reducer-music';
import userReducer from './store/reducers/reducer-user';


import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware, ConnectedRouter} from 'connected-react-router';

const saveToLocalStorage = state => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (e) {
		console.log('Could not save state');
	}
};
const loadFromLocalStorage = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			return;
		}
		return JSON.parse(serializedState);
	} catch {
		return undefined;
	}
};

const history = createBrowserHistory();

const middleware = [
	thunkMiddleware,
	routerMiddleware(history)
];


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	music: musicReducer,
	users: userReducer,
	router: connectRouter(history)
});

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(...middleware)));

store.subscribe(() => {
	saveToLocalStorage({
		users: {
			user: store.getState().users.user
		}
	});
});

const app = (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App/>
		</ConnectedRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
