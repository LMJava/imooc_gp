import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
export default class ArrayUtils {
    static updateArray(array, item){
        for(var i = 0, len = array.length; i<len; i++){
            var temp = array[i]
            if(temp===item){
                array.splice(i, 1)
                return
            }
        }
        array.push(item)
    }
}