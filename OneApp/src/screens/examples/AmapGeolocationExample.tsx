import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, SafeAreaView, ScrollView, PermissionsAndroid } from 'react-native';
import AMapGeolocation from '@uiw/react-native-amap-geolocation';


export default class AmapGeolocationExample extends Component {
  static title = '高德定位';
  state = {
    location: '',
    isListener: false,
    isStarted: false,
    isGps: false,
    isLocationCacheEnable: true
  };
  componentDidMount() {
    let apiKey = ''
    if (Platform.OS === 'ios') {
      apiKey = '43a58201d57131e7381b35da46ed1d1f';
    }
    if (Platform.OS === 'android') {
      // 开启定位权限
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      apiKey = 'b82786090630e959d647798f41e3ae1b';
    }

    if (apiKey) {
      AMapGeolocation.setApiKey(apiKey);
    }
    // iOS 指定所需的精度级别
    AMapGeolocation.setDesiredAccuracy(3);
    // Android 指定所需的精度级别，可选设置，默认 高精度定位模式
    AMapGeolocation.setLocationMode(1);
    // 定位是否返回逆地理信息
    AMapGeolocation.setLocatingWithReGeocode(true);
    // 当设备可以正常联网时，还可以返回该定位点的对应的中国境内位置信息（包括：省、市、区/县以及详细地址）。
    AMapGeolocation.addLocationListener((location) => {
      console.log('返回定位信息', location);
      this.setState({
        location: JSON.stringify(location, null, 2),
      });
    });
    console.log('AMapGeolocation.addLocationListener', AMapGeolocation.startUpdatingHeading)
  }
  getCurrentLocation = async () => {
    try {
      const json = await AMapGeolocation.getCurrentLocation();
      console.log('json:-json-->>>', json);
      this.setState({
        location: JSON.stringify(json, null, 2),
      })
    } catch (error) {
      console.log('json:-error-->>>', error);
    }
  }
  getLocationState = async () => {
    const isStarted = await AMapGeolocation.isStarted();
    if (isStarted) {
      this.setState({ isStarted });
    }
  }
  locationListener = () => {
    this.setState({
      isListener: !this.state.isListener
    }, () => {
      console.log('连续定位！', this.state.isListener ? '开启' : '关闭')
      if (this.state.isListener) {
        AMapGeolocation.start();
      } else {
        AMapGeolocation.stop();
      }
    })
  }
  // android是否开启gps优先
  gpsFirst = () => {
    if (Platform.OS == 'android') {
      this.setState({
        isGps: !this.state.isGps
      }, () => {
        console.log('GPS优先', this.state.isGps ? '开启' : '关闭')
        if (this.state.isGps) {
          return
        } else {
          AMapGeolocation.setGpsFirst(this.state.isGps);
        }
      })
    } else {
      return
    }
  }

  coordinateConvert = async () => {
    try {
      // 将百度地图转换为 高德地图 经纬度
      const resulte = await AMapGeolocation.coordinateConvert({
        latitude: 40.002172,
        longitude: 116.467357,
      }, 0);
      console.log('~coordinateConvert~~', resulte)
    } catch (error) {
      console.log('~coordinateConvert:error~~', error)
    }
  }
  // 开启缓存定位
  setLocationCache = async () => {
    if (Platform.OS == 'android') {
      this.setState({
        isLocationCacheEnable: !this.state.isLocationCacheEnable
      }, () => {
        if (this.state.isLocationCacheEnable) {
          AMapGeolocation.setLocationCacheEnable(this.state.isLocationCacheEnable)
          return console.log('已经开启缓存定位')
        } else {
          AMapGeolocation.setLocationCacheEnable(this.state.isLocationCacheEnable)
          return console.log('关闭缓存定位')
        }
      })
    }
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.welcome}>☆AMapGeolocation Example☆</Text>
          <Button
            onPress={this.getLocationState}
            title={`获取连续定位状态: ${this.state.isStarted.toString()}`}
            color="#841584"
          />
          <Button
            onPress={this.coordinateConvert}
            title={`百度地图 => 高德地图经纬度`}
            color="#841584"
          />
          <Button
            onPress={this.getCurrentLocation}
            title="获取当前定位信息"
            color="#841584"
          />
          <Button
            onPress={this.locationListener}
            // title="获取当前定位信息"
            title={`${this.state.isListener ? '关闭' : '开启'}连续监听定位`}
            color="#841584"
          />
          <Button
            onPress={this.gpsFirst}
            title={`${this.state.isGps ? '关闭:' : '开启:'}androidGPS优先`}
            color="#841584"
          />
          <Button
            onPress={this.setLocationCache}
            title={`${this.state.isLocationCacheEnable ? '关闭:' : '开启:'}android使用缓存定位`}
            color="#841584"
          />
          <ScrollView style={{ flex: 1 }}>
            <Text>
              {this.state.location}
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
