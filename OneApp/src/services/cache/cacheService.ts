import RNAsyncStorageFlipper from 'rn-async-storage-flipper';
import AsyncStorage from '@react-native-community/async-storage';
import mapValues from 'lodash/mapValues';

__DEV__ && RNAsyncStorageFlipper(AsyncStorage);

type Settings = object;
const Keys = mapValues({
  Settings: 'APP_SETTINGS',
}, value => `LS.${value}`);

async function getSettingsAsync(): Promise<Settings> {
  const json = await AsyncStorage.getItem(Keys.Settings);
  if (!json) {
    return {};
  }

  try {
    return JSON.parse(json);
  } catch (e) {
    return {};
  }
}

async function updateSettingsAsync(updateSettings: Partial<Settings>): Promise<void> {
  const currentSettings = await getSettingsAsync();
  const newSettings = {
    ...currentSettings,
    ...updateSettings
  };
  await AsyncStorage.setItem(Keys.Settings, JSON.stringify(newSettings));
}


async function put(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.warn("CacheService: Failed to put pair " + `[${key}, ${value}]`)
    __DEV__ && console.log(e)
  }
}

async function get(key: string): Promise<any> {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.warn("CacheService: Failed to get " + key)
    __DEV__ && console.log(e)
  }
}

export {
  put,
  get
}

export default {
  getSettingsAsync,
  updateSettingsAsync
}
