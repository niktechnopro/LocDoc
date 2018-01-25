import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import reduxPromise from 'redux-promise';
import RootReducer from './reducers/RootReducer';

// var theStore = createStore(RootReducer)
const theStore = applyMiddleware(reduxPromise)(createStore)(RootReducer)
//we need middleware so that axios request will execute properly

ReactDOM.render(
	<Provider store={theStore}>
	<App />
	</Provider>
	, document.getElementById('root'));
// registerServiceWorker();
