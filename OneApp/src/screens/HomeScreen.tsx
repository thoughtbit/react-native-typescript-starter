import * as React from 'react';
import { StyleSheet } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '../components/ui/Icons';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { ImageIcon } from "../components/ui/ImageIcon";
import  { CustomIcon } from "../components/ui/CustomIcon";

const getUniqueID = getUniqueId();

type Props = {
  navigation: StackNavigationProp<{[key: string]: undefined}>;
}

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>设备信息</Text>
        <Text style={styles.sectionDescription}>
          <Ionicons
            size={48}
            name="ios-add"
            lightColor={Colors.light.tint}
            darkColor={Colors.dark.tint}
          />

          <CustomIcon
            size={48}
            name="icon-quanzi"
            color="red"
          />

          <ImageIcon name={''} style={{ marginRight: 10, marginLeft: 6, resizeMode: "contain" }} />
          获取设备的唯一ID: {getUniqueID}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: "#666"
  }
});
