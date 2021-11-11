import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

import heroesReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites'],
};

const rootReducer = combineReducers({
  heroesReducer: persistReducer(persistConfig, heroesReducer),
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
