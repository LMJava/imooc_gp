import React, { Component } from 'react';
import {
    AsyncStorage,
} from 'react-native';
import key from '../../../res/data/keys.json'
import lang from '../../../res/data/langs.json'

export const FAVORITE_KEY_PREFIX = 'favorite_'
export default class FavoriteDao{
    constructor(flag){
        this.flag = flag;
        this.favoriteKey = FAVORITE_KEY_PREFIX+flag;
    }
    /**
     * 收藏项目，保存收藏的项目
     * @param {any} key 项目id 或者名称
     * @param {any} value 收藏的项目
     * @param {any} callback 
     * @memberof FavoriteDao
     */
    saveFavoriteItem(key, value, callback){
        AsyncStorage.setItem(key, value, (error)=>{
            if(!error){
                this.updateFavoriteKeys(key, true)
            }
        })
    }
    /**
     * 取消收藏，移除已经收藏的项目
     * @param {any} key 
     * @memberof FavoriteDao
     */
    removeFavoriteItem(key){
        AsyncStorage.removeItem(key, (error)=>{
            if(!error){
                this.updateFavoriteKeys(key, false)
            }
        })
    }
    /**
     * 获取收藏项目对应的key
     * @returns 
     * @memberof FavoriteDao
     */
    getFavoriteKeys(){
        return new Promise((resolve, reject)=>{
            AsyncStorage.getItem(this.favoriteKey, (error, result)=>{
                if(!error){
                    try {
                        resolve(JSON.parse(result))
                    } catch (e){
                        reject(e)
                    }
                }else {
                    reject(error)
                }
            })
        })
    }
    /**
     * 更新Favorite key集合
     * @param {any} key 
     * @param {any} isAdd 
     * @memberof FavoriteDao
     */
    updateFavoriteKeys(key, isAdd){
        AsyncStorage.getItem(this.favoriteKey, (error, result)=>{
            let favoriteKeys = [], index
            if(!error){
                if(result){
                    favoriteKeys = JSON.parse(result)
                }
                index = favoriteKeys.indexOf(key)
                if(isAdd){
                    if(index === -1) favoriteKeys.push(key)
                } else {
                    if(index !== -1) favoriteKeys.splice(index, 1)
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys))
            }
        })
    }
}