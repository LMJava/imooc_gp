import {
    AsyncStorage,
} from 'react-native';
export default class DataRepository{
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
            fetch(url)
                .then(response=>response.json())
                .then(result=>{
                    if(!result){
                        reject(new Error('responsedData is null'))
                        return
                    }
                    resolve(result.items)
                    this.saveRepository(url, result.items)
                })
                .catch(error=>reject(error))
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