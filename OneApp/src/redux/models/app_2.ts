import { createReducer } from 'redux-create-reducer';
import LocalStorage from "../../storage/LocalStorage";

const initialState = {
  isFetching: false,
  requestQuantity: 0, // 当前应用中正在进行的API请求数
  error: null, // 应用全局错误信息,

  preferredAppearance: 'no-preference',
};

// action types
export const TYPES = {
  START_REQUEST: "APP/START_REQUEST",   // 开始发送请求
  FINISH_REQUEST: "APP/FINISH_REQUEST", // 请求结束
  SET_ERROR: "APP/SET_ERROR",           // 设置错误信息
  REMOVE_ERROR: "APP/REMOVE_ERROR",      // 删除错误信息,

  LOAD_SETTINGS: "APP/LOAD_SETTINGS",
  SET_PREFERRED_APPEARANCE: "APP/SET_PREFERRED_APPEARANCE",
};

// action creators
export const actions = {
  startRequest: () => ({
    type: TYPES.START_REQUEST
  }),
  finishRequest: () => ({
    type: TYPES.FINISH_REQUEST
  }),
  setError: error => ({
    type: TYPES.SET_ERROR,
    error
  }),
  removeError: () => ({
    type: TYPES.REMOVE_ERROR
  }),

  loadSettings() {
    return async (dispatch) => {
      const [localStorageSettings, devMenuSettings] = await Promise.all([
        LocalStorage.getSettingsAsync(),
      ]);

      return dispatch({
        type: 'loadSettings',
        payload: {
          ...localStorageSettings,
          devMenuSettings,
        },
      });
    };
  },
  setPreferredAppearance(preferredAppearance) {
    return async (dispatch) => {
      try {
        await Promise.all([
          LocalStorage.updateSettingsAsync({
            preferredAppearance,
          }),
        ]);

        return dispatch({
          type: 'setPreferredAppearance',
          payload: { preferredAppearance },
        });
      } catch (e) {
        alert('出错了, 无法改变皮肤');
      }
    };
  },
};

// reducers
const reducer = createReducer(initialState, {
  // 异步请求开始
  [TYPES.START_REQUEST](state) {
    return {
      ...state,
      isFetching: true,
      // 每接收一个API请求开始的action，requestQuantity加1
      requestQuantity: state.requestQuantity + 1
    };
  },
  // 异步请求完成
  [TYPES.FINISH_REQUEST](state) {
    return {
      ...state,
      isFetching: false,
      // 每接收一个API请求结束的action，requestQuantity减1
      requestQuantity: state.requestQuantity - 1
    };
  },
  // 设置错误
  [TYPES.SET_ERROR](state, action) {
    return {
      ...state,
      error: action.error
    };
  },
  // 清除错误
  [TYPES.REMOVE_ERROR](state) {
    return {
      ...state,
      error: null
    };
  },


  [TYPES.LOAD_SETTINGS](state, action) {
    return {
      ...state,
      preferredAppearance: action.payload
    };
  },
  [TYPES.SET_PREFERRED_APPEARANCE](state, action) {
    const { preferredAppearance } = action.payload;
    return {
      ...state,
      preferredAppearance
    };
  }
});

export default reducer;

// selectors
export const getError = state => {
  return state.app.error;
};

export const getLoading = state => {
  return state.app.isFetching;
};

export const getRequestQuantity = state => {
  return state.app.requestQuantity;
};
