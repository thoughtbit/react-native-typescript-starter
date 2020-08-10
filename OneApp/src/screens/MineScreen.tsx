import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { View } from '../components/Themed';
import {StackNavigationProp} from "@react-navigation/stack";

type Props = {
  navigation: StackNavigationProp<{[key: string]: undefined}>;
}

export default function MineScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Button
        title="某某人"
        onPress={() =>
          navigation.push('Profile', {
            name: `我是${Math.floor(Math.random() * 100)}`,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});
