import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

import configureStore  from './store/configureStore.js'
import App from './components/App';

const store = configureStore();
store.runSaga();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));

registerServiceWorker();
