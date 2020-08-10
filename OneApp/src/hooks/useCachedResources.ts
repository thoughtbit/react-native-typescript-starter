import {Entypo, Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Assets as StackAssets } from '@react-navigation/stack';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

import Icons from '../constants/Icons';

async function loadAssetsAsync() {
  const iconRequires = Object.keys(Icons).map(key => Icons[key]);

  const assetPromises: Promise<any>[] = [
    Asset.loadAsync(iconRequires),
    Asset.loadAsync(StackAssets),
    Font.loadAsync(Ionicons.font),
    Font.loadAsync(Entypo.font),

    Font.loadAsync({
      iconfont: require('../../assets/fonts/iconfont.ttf'),
      'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ];

  await Promise.all(assetPromises);
}
export function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Load fonts and images icons
        await loadAssetsAsync();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    })();
  }, []);

  return isLoadingComplete;
}
