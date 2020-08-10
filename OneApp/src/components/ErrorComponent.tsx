import { ReactNode } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';

export type ErrorComponentProps = {
  forceReload: () => void;
  error?: Error;
};

export default function ErrorComponent({ error, forceReload }: ErrorComponentProps): ReactNode {
  // eslint-disable-next-line no-console
  console.log('error:', error || 'null error');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>哦!</Text>
      <View style={styles.view} />
      <Text style={styles.text}>出错了:</Text>
      <View style={styles.view} />
      <Text style={styles.text}>
        &quot;
        {error ? error.message : '未知错误!'}
        &quot;
      </Text>
      <View style={styles.view} />
      <Text style={styles.text}>尝试修复一下:</Text>
      <View style={styles.view} />
      <View style={styles.view} />
      <View style={styles.view} />
      <View style={styles.buttonBox}>
        <Button color="white" title="确定" onPress={forceReload} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  view: {
    height: 20,
  },
  buttonBox: {
    height: 50,
    width: 100,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});
