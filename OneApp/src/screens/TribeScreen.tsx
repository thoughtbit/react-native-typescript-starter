import * as React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface MessageEvent {
  nativeEvent: {
    data: string;
  };
}

const injectedJavaScript = `window.ReactNativeWebView.postMessage(JSON.stringify(window.location));`;

const handleMessage = ({ nativeEvent: { data } }: MessageEvent) => {
  console.log('Got a message from WebView: ', JSON.parse(data));
};

export default function TribeScreen() {
  return (
    <WebView
      source={{ uri: 'http://www.baidu.com' }}
      style={styles.container}
      onMessage={handleMessage}
      injectedJavaScript={injectedJavaScript}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
