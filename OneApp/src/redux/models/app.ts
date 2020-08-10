import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cacheService from "../../services/cache/cacheService";
import {ThemeName} from "../../types/global";

interface AppStateType {
  language: null,
  themeName: Exclude<ThemeName, 'brand'> | null,
  loadSettings: null,
  preferredAppearance: string,
  fetchError: string | null, // 应用全局错误信息
}

const initialState: AppStateType = {
  language: null,
  themeName: null,
  loadSettings: null,
  preferredAppearance: 'no-preference',
  fetchError: null
};

const fetchFailed = (state: AppStateType, action: PayloadAction<string>) => {
  state.fetchError = action.payload;
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadSettings: (state:AppStateType) => {
      // @ts-ignore
      const [localStorageSettings] = Promise.all([
        cacheService.getSettingsAsync()
      ]);

      return {
        ...state,
        ...localStorageSettings
      }
    },
    setPreferredAppearance: (state:AppStateType, action: PayloadAction<string>) => ({
      ...state,
      preferredAppearance: action.payload
    }),
  }
});

const { actions, reducer } = appSlice;
export const { loadSettings, setPreferredAppearance } = actions;
export default reducer;
