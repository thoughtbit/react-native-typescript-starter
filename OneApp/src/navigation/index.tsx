import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSettings } from '../redux/models';
import { AppNavigator } from "./app.navigator";
import ErrorBoundary from "../components/ErrorBoundary";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStoreType } from "../redux/rootReducer";

export const AppWithNavigation = (props: any): React.ReactElement | undefined => {
  const [isReady, setReady] = React.useState(false);
  const dispatch = useDispatch();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const preferredAppearance = useSelector(
    (state: RootStoreType) => state.app.preferredAppearance
  );

  React.useEffect(() => {
    (async () => {
      try {
        dispatch(loadSettings());
      } catch (e) {
        console.log({ e });
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const { colorScheme } = props;

  let theme = preferredAppearance === 'no-preference' ? colorScheme : preferredAppearance;
  if (theme === 'no-preference') {
    theme = 'light';
  }

  if (!isReady) {
    return <AppLoading />;
  }

  if (isReady) {
    return (
      <ErrorBoundary forceReload={forceUpdate}>
        <SafeAreaProvider>
          <StatusBar />
          <AppNavigator theme={theme} />
        </SafeAreaProvider>
      </ErrorBoundary>
    );
  }
};
