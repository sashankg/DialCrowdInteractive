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
        ...createStoreWithMiddleware(rootReducer),
        runSaga: () => sagaMiddleware.run(rootSaga),
    }
}
