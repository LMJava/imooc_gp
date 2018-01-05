import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
export default class Utils {
    /**
     * 检查该Item 有没有被收藏过
     * @static
     * @param {any} item 
     * @param {any} items 
     * @returns 
     * @memberof Utils
     */
    static checkFavorite(item, items){
        let i = 0, len = items.length
        for(i, len; i<len; i++){
            if(item.id.toString()===items[i]) return true
        }
        return false
    }
}