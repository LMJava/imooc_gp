/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  DeviceEventEmitter,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Toast, {DURATION} from 'react-native-easy-toast'
import Popular from './PopularPage';
import MyRoute from './my/MyRoute';
import AsyncStorageTest from '../../AsyncStorageTest';


// import { StackNavigator } from 'react-navigation';
// import NavigationBar from '../common/NavigationBar'
// import ListView from './ListViewCmt'
// import Fetch from './FetchTest'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedTab: 'tb_popular'
    }
  }
  componentDidMount(){
    this.listener = DeviceEventEmitter.addListener('showToast', (text)=>{
      this.toast.show(text, DURATION.LENGTH_LONG)
    })
  }
  componentWillUnmount(){
    this.listener&&this.listener.remove()
  }
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_popular'}
            selectedTitleStyle={{color:'#2196F3'}}
            title="最热"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196F3'}]} source={require('../../res/images/ic_polular.png')} />}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
            <View style={styles.tb_popular}>
              <Popular/>
            </View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_trending'}
            selectedTitleStyle={{color:'#2196F3'}}
            title="趋势"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196F3'}]} source={require('../../res/images/ic_trending.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
            <View style={styles.tb_trending}>
              <AsyncStorageTest/>
            </View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_favorite'}
            selectedTitleStyle={{color:'#2196F3'}}
            title="收藏"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_favorite.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196F3'}]} source={require('../../res/images/ic_favorite.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
            <View style={styles.tb_favorite}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_my'}
            selectedTitleStyle={{color:'#2196F3'}}
            title="我的"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_my.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196F3'}]} source={require('../../res/images/ic_my.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_my' })}>
            <View style={styles.tb_my}>
              <MyRoute {...this.props}/>
            </View>
          </TabNavigator.Item>
        </TabNavigator>
        <Toast ref={toast=>this.toast = toast} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  tb_popular: {
    flex: 1,
    // backgroundColor: 'red',
  },
  tb_trending: {
    flex: 1,
    // backgroundColor: 'orange',
  },
  tb_favorite: {
    flex: 1,
    // backgroundColor: 'yellow',
  },
  tb_my: {
    flex: 1,
    // backgroundColor: 'green',
  },
  image: {
    width: 22,
    height: 22,
  },
});
