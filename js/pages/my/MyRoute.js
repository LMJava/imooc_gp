import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'

import MyPage from './MyPage'
import CustomKeyPage from './CustomKeyPage'

export default class MyRoute extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const ModalStack = StackNavigator(
            {
                My: {
                    screen: MyPage,
                },
                CustomKey: {
                    screen: CustomKeyPage,
                }
            },{
                headerMode: 'none',
            }
        );
        return <ModalStack/>
    }
};