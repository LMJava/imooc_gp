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
// import { Navigator } from 'react-native-deprecated-custom-components'
import TabNavigator from 'react-native-tab-navigator';
// import Boy from './Boy'
import NavigationBar from './NavigationBar'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedTab: 'tb_popular'
    }
  }
  renderButton(_image){
    return(
      <TouchableOpacity
        onPress={()=>{
        }}
      >
        <Image style={{width: 22,height: 22, margin: 5}} source ={_image}></Image>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title = {'\\^。^/'}
          style = {{
            backgroundColor: '#EE6363',
          }}
          leftButton = {
            this.renderButton(require('./res/images/ic_arrow_back_white_36pt.png'))
          }
          rightButton = {
            this.renderButton(require('./res/images/ic_star.png'))
          }
        />
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_popular'}
            selectedTitleStyle={{color:'red'}}
            title="最热"
            renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_polular.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'red'}]} source={require('./res/images/ic_polular.png')} />}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
            <View style={styles.tb_popular}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_trending'}
            selectedTitleStyle={{color:'orange'}}
            title="趋势"
            renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_trending.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'orange'}]} source={require('./res/images/ic_trending.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
            <View style={styles.tb_trending}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_favorite'}
            selectedTitleStyle={{color:'yellow'}}
            title="收藏"
            renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_polular.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'yellow'}]} source={require('./res/images/ic_polular.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
            <View style={styles.tb_favorite}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_my'}
            selectedTitleStyle={{color:'green'}}
            title="我的"
            renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_trending.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'green'}]} source={require('./res/images/ic_trending.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_my' })}>
            <View style={styles.tb_my}></View>
          </TabNavigator.Item>
        </TabNavigator>
        {/* <Navigator.Navigator
          initialRoute={{
            component: Boy
          }}
          renderScene={(route,navigator) => {
            let Component = route.component
            return <Component navigator={navigator} {...route.params}/>
          }}
        /> */}
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
    backgroundColor: 'red',
  },
  tb_trending: {
    flex: 1,
    backgroundColor: 'orange',
  },
  tb_favorite: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  tb_my: {
    flex: 1,
    backgroundColor: 'green',
  },
  image: {
    width: 22,
    height: 22,
  },
});
