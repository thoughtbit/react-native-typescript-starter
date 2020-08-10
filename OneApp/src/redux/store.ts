import {Action, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import logger from 'redux-logger';
import { useDispatch } from 'react-redux';
import { persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import persistedReducer, { RootStoreType } from './rootReducer';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];

const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
});

// Redux persist
const persistor = persistStore(store);

export { persistor };
export default store;

// 获取 dispatch 类型, useDispatch 会用到
export type AppDispatch = typeof store.dispatch;
// 异步 action 会用到
export type AppThunk<ReturnType> = ThunkAction<ReturnType, RootStoreType, unknown, Action<string>>
// 导出封装 useAppDispatch （有类型提示）
export const useAppDispatch = () => useDispatch<AppDispatch>()
