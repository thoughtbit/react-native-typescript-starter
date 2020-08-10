import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TextExample = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#f5f5f5' }]}>
      <Text style={styles.text}>排版内容页</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginVertical: 4,
  },
});

TextExample.title = '排版';
export default TextExample;
