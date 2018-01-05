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
import TrendingPage from './TrendingPage';
import My from './my/MyPage';
import AsyncStorageTest from '../../AsyncStorageTest';
import WebViewTest from '../../WebViewTest';
import TrendingTest from '../../TrendingTest';
import PopularPage from './PopularPage';

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
  _renderTab(Component, selectTab, title, renderIcon){
    return <TabNavigator.Item
      selected={this.state.selectedTab === selectTab}
      selectedTitleStyle={{color:'#2196F3'}}
      title={title}
      renderIcon={() => <Image style={styles.image} source={renderIcon} />}
      renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196F3'}]} source={renderIcon} />}
      // badgeText="1"
      onPress={() => this.setState({ selectedTab: selectTab })}>
        <Component {...this.props}/>
    </TabNavigator.Item>
  }
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          {this._renderTab(PopularPage, 'tb_popular', '最热', require('../../res/images/ic_polular.png'))}
          {this._renderTab(TrendingPage, 'tb_trending', '趋势', require('../../res/images/ic_trending.png'))}
          {this._renderTab(WebViewTest, 'tb_favorite', '收藏', require('../../res/images/ic_favorite.png'))}
          {this._renderTab(My, 'tb_my', '我的', require('../../res/images/ic_my.png'))}
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
