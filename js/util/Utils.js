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
        for(let i = 0, len = items.length; i<len; i++){
            let id=item.id? item.id:item.fullName;
            if (id.toString() === items[i]) return true
        }
        return false
    }
}