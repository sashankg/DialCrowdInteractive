import { 
    createStore, 
    applyMiddleware, 
} from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers/rootReducer.js'
import rootSaga from '../sagas/rootSaga.js';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()
    const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore)

    return {
        ...createStoreWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
        runSaga: () => sagaMiddleware.run(rootSaga),
    }
}
