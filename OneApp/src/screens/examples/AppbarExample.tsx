import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  navigation: StackNavigationProp<{[key: string]: any}>,
  route: {[key: string]: any}
}

const AppbarExample = ({route, navigation}: Props) => {
  const insets =  useSafeAreaInsets();
  navigation.setOptions({
    headerTitle: props => <Text {...props}>Appbar</Text>,
    headerRight: () => {
      return (
        <Text style={{marginRight: 15}} onPress={() => navigation.goBack()}>菜单</Text>
      )
    },

    /*
    header: ({ navigation, scene, previous })=> (
      <View style={{
        marginBottom: insets.bottom,
        marginTop: insets.top,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {
          previous
            ?
            (<Text style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              justifyContent: 'center',
              paddingLeft: 10,
              textAlign: 'center'
            }} onPress={() => navigation.goBack()} >返回</Text>)
            : null
        }
        <Text style={{
          marginHorizontal: Platform.OS === 'ios' ? 44 : 56,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }} >{scene.descriptor.options.title}</Text>
      </View>
    ),*/
  });
  const { itemId, title } = route.params;
  return (
    <View style={[styles.container, { backgroundColor: '#f5f5f5' }]}>
      <Text style={styles.text}>头部导航内容页</Text>
      <Text style={styles.text}>路由传参: {itemId}, {title}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('appbar', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />

    </View>
  );
}


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

AppbarExample.title = 'Appbar';

export default AppbarExample;
