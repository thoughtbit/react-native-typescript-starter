import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import { getUniqueId } from 'react-native-device-info';
import md5 from 'blueimp-md5';

import appReducer from './models/app';
import userReducer from './models/user';
import exampleReducer from './models/counter';
import { PersistConfig } from "redux-persist/es/types";

const getUniqueID = getUniqueId();
const encryptor = createEncryptor({
  secretKey: md5(getUniqueID),
});

// Redux persist
const rootPersistConfig: PersistConfig<RootStoreType> = {
  key: "root",
  version: 1.0,
  storage: AsyncStorage,
  blacklist: [
    "example",
  ],
  // @ts-ignore
  transforms: [encryptor],
  debug: process.env.NODE_ENV !== 'production', // to get useful logging
};

// exampleReducer
const exampleReducerPersistConfig = {
  key: "example",
  storage: AsyncStorage,
  blacklist: [],
};

const persistedExampleReducer = persistReducer(
  exampleReducerPersistConfig,
  exampleReducer,
);

// 合并所有模块的reducer成一个根reducer
const rootReducer = combineReducers({
  example: persistedExampleReducer,
  app: appReducer,
  user: userReducer
});

export type RootStoreType = ReturnType<typeof rootReducer>;
export type DispatchFunType<P> = ({ type, payload }: ActionType<P>) => void;
export type ActionType<P> = { type: string; payload?: P };

export default persistReducer(rootPersistConfig, rootReducer);
