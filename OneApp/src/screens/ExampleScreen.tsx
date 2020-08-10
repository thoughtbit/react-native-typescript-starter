import * as React from 'react';
import {StyleSheet, Text, View, TouchableHighlight, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import AppbarExample from './examples/AppbarExample';
import TextExample from './examples/TextExample';
import AmapGeolocationExample from './examples/AmapGeolocationExample';

export const examples: Record<
  string,
  React.ComponentType<any> & { title: string }
  > =  {
  // 演示例子列表
  appbar: AppbarExample,
  text: TextExample,
  amap: AmapGeolocationExample,
}

type Props = {
  navigation: StackNavigationProp<{[key: string]: undefined}>;
}

type Item = {
  id: string;
  data: typeof examples[string];
}

const data = Object.keys(examples).map((id):Item => ({ id, data: examples[id] }));

export default function ExampleScreen({navigation}: Props) {
  const readerItem = ({item}: { item: Item}) => {
    const { id, data } = item;
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={styles.item}
        onPress={() => {
          navigation.navigate(id, {
            itemId: id,
            title: data.title
          });
        }}>
        <Text>{data.title}</Text>
      </TouchableHighlight>
    );
  }
  const keyExtractor = (item: { id: string }) => item.id;

  return (
   <FlatList
     contentContainerStyle={[styles.container, {
       backgroundColor: '#f5f5f5',
     }]}
     data={data}
     renderItem={readerItem}
     keyExtractor={keyExtractor}
   />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    paddingVertical: 15,
    paddingLeft: 8,
    lineHeight: 28,
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
