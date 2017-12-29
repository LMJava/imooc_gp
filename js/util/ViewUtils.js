import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
export default class ViewUtils {
    static getLeftBtn(callBack){
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={()=>callBack}
        >
            <Image
                style={{width: 26,height: 26, tintColor: 'white'}}
                source ={require('../../res/images/ic_arrow_back_white_36pt.png')}
            ></Image>
        </TouchableOpacity>
    }
}