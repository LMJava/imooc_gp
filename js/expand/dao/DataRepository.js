import {
    AsyncStorage,
} from 'react-native'
import GitHubTrending from 'GitHubTrending'

export const FLAG_STOTAGE = {flag_popular: 'popular', flag_trending: 'trending'}
export default class DataRepository{
    constructor(flag){
        this.flag = flag
        if(flag === FLAG_STOTAGE.flag_trending){
            this.trending = new GitHubTrending()
        }
    }
    fetchRepository(url){
        return new Promise((resolve, reject)=>{
            // 首先获取本地数据
            this.fetchLocalRepository(url)
                .then(result=>{
                    if(result){
                        resolve(result)
                    } else {
                        this.fetchNetRepository(url)
                            .then(result=>resolve(result))
                            .catch(e=>reject(e))
                    }
                })
                .catch(e=>{
                    this.fetchNetRepository(url)
                        .then(result=>resolve(result))
                        .catch(e=>reject(e))
                })
        })
    }
    fetchLocalRepository(url){
        return new Promise((resolve, reject)=>{
            AsyncStorage.getItem(url, (error, result)=>{
                if(!error){
                    try{
                        resolve(JSON.parse(result))
                    }catch(e){
                        reject(e)
                    }
                } else {
                    reject(error)
                }
            })
        })
    }
    fetchNetRepository(url){
        return new Promise((resolve, reject)=>{
            if(this.flag === FLAG_STOTAGE.flag_trending){
                this.trending.fetchTrending(url)
                    .then(result => {
                        if(!result) {
                            reject(new Error('responseData is null'))
                            return
                        }
                        this.saveRepository(url, result)
                        resolve(result)
                    })
            } else {
                fetch(url)
                    .then(response=>response.json())
                    .then(result=>{
                        if(!result){
                            reject(new Error('responsedData is null'))
                            return
                        }
                        this.saveRepository(url, result.items)
                        resolve(result.items)
                    })
                    .catch(error=>reject(error))
            }
        })
    }
    saveRepository(url, items, callBack){
        if(!url || !items) return
        let wrapData={items: items, update_date: new Date().getTime()}
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callBack)
    }
    checkDate(loneTime){
        let cDate = new Date()
        let tDate = new Date()
        tDate.setTime(loneTime)
        if(cDate.getMonth() !== tDate.getMonth() 
            || cDate.getDay() !== tDate.getDay() 
            || cDate.getHours() - tDate.getHours() > 4
        ) return false
        return true
    }
}