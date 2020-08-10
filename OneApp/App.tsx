import React from 'react';
import { Platform, YellowBox, UIManager } from 'react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { enableScreens } from 'react-native-screens';
import { useCachedResources } from './src/hooks/useCachedResources';
import { AppWithNavigation } from './src/navigation';
import store, { persistor } from './src/redux/store';

function setup() {
  /**
   * SafeView: from react-navigation library.
   *
   * 180000ms: React Native complains that although the interval
   * keeps on running in the background, it cannot be called.
   * In this particular case calling getRecentlyPlayed() when the
   * app comes to foreground is the better UX.
   *
   * ERR_CONNECTION_REFUSED / Encountered an error loading page: Android / iOS in the login webview,
   * we navigate to localhost which refuses connection.
   */
  YellowBox.ignoreWarnings([
    "SafeView",
    "180000ms",
    "ERR_CONNECTION_REFUSED",
    "Encountered an error loading page",
    "Require cycle:"
  ])

  // optimize screen memory usage, see: https://reactnavigation.org/docs/react-native-screens
  enableScreens();

  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }
}

setup();

export default (props: any) => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppearanceProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={ persistor }>
            <AppWithNavigation {...props } colorScheme={ colorScheme } />
          </PersistGate>
        </ReduxProvider>
      </AppearanceProvider>
    );
  }
}
