/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Popular from './PopularPage';
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
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_popular'}
            selectedTitleStyle={{color:'red'}}
            title="最热"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'red'}]} source={require('../../res/images/ic_polular.png')} />}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
            <View style={styles.tb_popular}>
              <Popular/>
            </View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_trending'}
            selectedTitleStyle={{color:'orange'}}
            title="趋势"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'orange'}]} source={require('../../res/images/ic_trending.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
            <View style={styles.tb_trending}>
              {/* <Fetch/> */}
            </View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_favorite'}
            selectedTitleStyle={{color:'yellow'}}
            title="收藏"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_favorite.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'yellow'}]} source={require('../../res/images/ic_favorite.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
            <View style={styles.tb_favorite}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_my'}
            selectedTitleStyle={{color:'green'}}
            title="我的"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_my.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'green'}]} source={require('../../res/images/ic_my.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_my' })}>
            <View style={styles.tb_my}></View>
          </TabNavigator.Item>
        </TabNavigator>
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
