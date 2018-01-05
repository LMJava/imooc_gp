import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    RefreshControl,
    FlatList,
    TextInput,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../common/NavigationBar'
import RepositoryCell from '../common/RepositoryCell'
import DataRepository, {FLAG_STOTAGE} from '../expand/dao/DataRepository'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import FavoriteDao, {} from '../expand/dao/FavoriteDao'
import ProjectModel from '../model/ProjectModel'
import Utils from '../util/Utils'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
let favoriteDao = new FavoriteDao(FLAG_STOTAGE.flag_popular)

export default class PopularPage extends Component {
    constructor(props){
        super(props)
        this.state={
            languages:[],
        }
        this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
    }
    componentDidMount(){
        this.LoadData()
    }
    
    LoadData(){
        this.LanguageDao.fetch()
            .then(result=>{
                if(result) this.setState({languages: result})})
            .catch(error=>console.log(error))
    }
    render(){
        let content = this.state.languages.length>0 
            ? <ScrollableTabView
                tabBarBackgroundColor="#2196F3"
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='white'
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                renderTabBar={() => <ScrollableTabBar/>}
            >
                {this.state.languages.map((result, i, arr)=>{
                    let lan = arr[i]
                    return lan.checked ? <PopularTab key={i} tabLabel={lan.name} {...this.props} ></PopularTab> : null
                })}
            </ScrollableTabView>
            : null
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={'最热'}
                    statusBar = {{backgroundColor: '#2196F3'}}
                />
                {content}
            </View>
        )
    }
}
class PopularTab extends Component {
    constructor(props){
        super(props)
        this.dataRepository = new DataRepository(FLAG_STOTAGE.flag_popular)
        this.state={
            dataSourse: '',
            isLoading: false,
            favoriteKeys: []
        }
    }
    componentDidMount(){
        this.loadData()
    }
    getFavoriteKeys(){
        favoriteDao.getFavoriteKeys()
            .then(keys=>{
                if(keys){
                    this.updateState({favoriteKeys: keys})
                }
                this.flushFavoriteState()
            })
            .catch(()=>this.flushFavoriteState())
    }
    /**
     * 更新Project Item Favorite状态
     * 
     * @memberof PopularTab
     */
    flushFavoriteState(){
        let projectModels = [],
            items = this.items,
            i = 0,
            len = items.length
        for(i, len; i < len; i++){
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys)))
        }
        this.updateState({
            dataSourse: projectModels,
            isLoading: false
        })
    }
    loadData(){
        this.setState({isLoading: true})
        let url = this.getFetchUrl(this.props.tabLabel)
        this.dataRepository.fetchRepository(url)
            .then(result=>{
                this.items = result&&result.items?result.items:result?result:[]
                this.getFavoriteKeys()
                DeviceEventEmitter.emit('showToast', '显示本地数据')
                if(result
                    &&result.update_date
                    &&!this.dataRepository.checkDate(result.update_date)
                ) return this.dataRepository.fetchNetRepository(url)
            })
            .then(items=>{
                if(!items || items.length === 0) return
                this.items = items
                this.getFavoriteKeys()
                DeviceEventEmitter.emit('showToast', '显示网络数据')                
            })
            .catch(error=>{
                console.log(error)
                this.updateState({
                    isLoading: false
                })
            })
    }
    updateState(dic){
        if(!this)return
        this.setState(dic)
    }
    getFetchUrl(key){
        return URL+key+QUERY_STR
    }
    onSelect(_projectModel){
        this.props.navigation.navigate('ReponsitoryDetail', {projectModel: _projectModel})
    }
    /**
     * favoriteIcon的单击回调函数
     * 
     * @param {any} _item 
     * @param {any} _isFavorite 
     * @memberof PopularTab
     */
    onFavorite(_item, _isFavorite){
        if(_isFavorite){
            favoriteDao.saveFavoriteItem(_item.id.toString(), JSON.stringify(_item))
        } else {
            favoriteDao.removeFavoriteItem(_item.id.toString())
        }
    }
    renderRow(_projectModel){
        return <RepositoryCell 
            projectModel={_projectModel}
            onSelect={()=>this.onSelect(_projectModel)}
            onFavorite={(item, isFavorite)=>this.onFavorite(item, isFavorite)}
        />
    }
    render(){
        return <View style={{flex: 1}}>
            <FlatList
                keyExtractor={(item, index)=>(item+index)}
                data={this.state.dataSourse}
                renderItem={({item})=>this.renderRow(item)}
                refreshControl={<RefreshControl
                    colors={['#2196F3']}
                    tintColor={'#2196F3'}
                    title={'Loading...'}
                    titleColor={'#2196F3'}
                    refreshing={this.state.isLoading}
                    onRefresh={()=>this.loadData()}
                />}
            /> 
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})