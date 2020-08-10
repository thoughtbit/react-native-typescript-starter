import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<{[key: string]: any}>,
  route: {[key: string]: any}
}

const ProfileScreen = ({route, navigation}: Props) => {
  // const {  name } = route.params;
  // navigation.setOptions({
  //   headerTitle: props => <Text {...props}>~{name}~</Text>,
  // });

  return (
    <View style={[styles.container, { backgroundColor: '#f5f5f5' }]}>
      <Text style={styles.text}>个人信息内容页</Text>
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

ProfileScreen.title = '个人信息';

export default ProfileScreen;
