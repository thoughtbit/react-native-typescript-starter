import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { InitialState, NavigationState, NavigationContainer } from '@react-navigation/native';
import { useKeepAwake } from 'expo-keep-awake';
import { put, get } from '../services/cache/cacheService';
import LinkingConfiguration from "./linking";
import { RootNavigator } from './root.navigator';
import { light, dark } from "../constants/Themes";

// 缓存路由器初始化配置
const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export function AppNavigator({ theme }: { theme: ColorSchemeName }) {
  // 保持唤醒模式
  useKeepAwake();

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState<InitialState | undefined>();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await get(PERSISTENCE_KEY);
        const state = JSON.parse(savedStateString || '');
        setInitialState(state);
      } catch (e) {
        // ignore error
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState().then(()=>{});
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={theme === 'dark' ? dark : light}
      initialState={initialState}
      onStateChange={(state: NavigationState | undefined) => {
        put(PERSISTENCE_KEY, JSON.stringify(state)).then(() => {});
      }}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
