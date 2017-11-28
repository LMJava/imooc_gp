import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import WelcomePage from './WelcomePage'
import HomePage from './HomePage'


export default class setup extends Component {
    constructor(props){
        super(props)
        this.state = {
            ReturnDom: 'Welcome',
        };
    }
    render() {
        let ReturnDom = indexStackNavigator(this.state.ReturnDom);
        return <ReturnDom/>
    }
}
function indexStackNavigator(type) {
    return StackNavigator({
        Welcome: {
            screen: WelcomePage,
        },
        Home: {
            screen: HomePage,
        },
    },{
        initialRouteName: type,
        headerMode: 'none',
    });
}