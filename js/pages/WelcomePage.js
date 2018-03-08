import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import {NavigationActions} from "react-navigation"
import NavigationBar from '../common/NavigationBar'

export default class WelcomePage extends Component {
    componentDidMount(){
        this.timer = setTimeout(()=>{
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: "Home"})]
            })
            this.props.navigation.dispatch(resetAction)
        }, 2.000)
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer)
    }
    render(){
        return <View>
            <NavigationBar
                title={'欢迎欢迎'}
                statusBar = {{
                backgroundColor: '#EE6363',
                }}
                style = {{
                backgroundColor: '#EE6363',
                }}
            />
            <Text>欢迎</Text>
        </View>
    }
}