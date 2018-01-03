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

import ReponsitoryDetail from './ReponsitoryDetail'

import CustomKeyPage from './my/CustomKeyPage'
import SortKeyPage from './my/SortKeyPage'


export default class setup extends Component {
    constructor(props){
        super(props)
        this.state = {
            ReturnDom: 'Home', // 'Welcome',
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

        ReponsitoryDetail: {
            screen: ReponsitoryDetail,
        },

        CustomKey: {
            screen: CustomKeyPage,
        },
        SortKey: {
            screen: SortKeyPage,
        }
    },{
        initialRouteName: type,
        headerMode: 'none',
    });
}