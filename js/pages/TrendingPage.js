import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    StyleSheet,
    RefreshControl,
    DeviceEventEmitter,
    TouchableOpacity,
} from 'react-native'
import GitHubTrending from 'GitHubTrending'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import FavoriteDao from '../expand/dao/FavoriteDao'
import ProjectModel from '../model/ProjectModel'
import NavigationBar from '../common/NavigationBar'
import TrendingCell from '../common/TrendingCell'
import Popover from '../common/Popover'
import TimeSpan from '../model/TimeSpan';
import Utils from '../util/Utils'

let timeSpanTextArray = [
    new TimeSpan('今 天', 'since=daily'),
    new TimeSpan('本 周', 'since=weekly'),
    new TimeSpan('本 月', 'since=monthly')
]
const API_URL = 'https://github.com/trending/'
let favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending)
var dataRepository = new DataRepository(FLAG_STORAGE.flag_trending)

export default class TrendingPage extends Component {
    constructor(props){
        super(props)
        this.state={
            languages:[],
            isVisible: false,
            buttonRect: {},
            timeSpan: timeSpanTextArray[0],
            // theme: this.props.theme
        }
        this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_language)
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
    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }
    closePopover() {
        this.setState({isVisible: false});
    }
    onSelectTimeSpan(timeSpan) {
        this.closePopover();
        this.setState({
            timeSpan: timeSpan
        })
    }
    renderTitleView(){
        return <View>
            <TouchableOpacity
                ref='button'
                underlayColor='transparent'
                onPress={()=>this.showPopover()}
            >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                        style={{
                            fontSize: 18,
                            color: 'white',
                            fontWeight: '400'
                        }}
                    >趋势 {this.state.timeSpan.showText}</Text>
                    <Image 
                        style={{width: 12, height: 12, marginLeft: 5}}
                        source={require('../../res/images/ic_spinner_triangle.png')}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }
    render(){
        let timeSpanView = <Popover
            isVisible={this.state.isVisible}
            fromRect={this.state.buttonRect}
            placement="bottom"
            onClose={()=>this.closePopover()}
            contentStyle={{opacity: 0.82, backgroundColor: '#343434'}}
        >
            <View style={{alignItems: 'center'}}>
                {timeSpanTextArray.map((result, i, arr) => {
                    return <TouchableOpacity 
                        key={i} 
                        onPress={()=>this.onSelectTimeSpan(arr[i])}
                        underlayColor='transparent'
                    >
                        <Text
                            style={{fontSize: 18, color: '#FFF', paddingHorizontal: 8, fontWeight: '400'}}
                        >
                            {arr[i].showText}
                        </Text>
                    </TouchableOpacity>
                })
                }
            </View>
        </Popover>
        let content = this.state.languages.length>0 
            ? <ScrollableTabView
                tabBarBackgroundColor="#2196F3"
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='white'
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                renderTabBar={() => <ScrollableTabBar 
                    style={{height: 40, borderWidth: 0, elevation: 2}} 
                    tabStyle={{height: 39}}
                />}
            >
                {this.state.languages.map((result, i, arr)=>{
                    let lan = arr[i]
                    return lan.checked ? <TrendingTab key={i} tabLabel={lan.name} timeSpan={this.state.timeSpan} {...this.props} ></TrendingTab> : null
                })}
            </ScrollableTabView>
            : null
        return(
            <View style={styles.container}>
                <NavigationBar
                    titleView={this.renderTitleView()}
                    statusBar = {{backgroundColor: '#2196F3'}}
                />
                {content}
                {timeSpanView}
            </View>
        )
    }
}
class TrendingTab extends Component {
    constructor(props){
        super(props)
        this.isFavoriteChanged = false
        this.state={
            dataSourse: '',
            isLoading: false,
            favoriteKeys: [],
        }
    }
    
    componentDidMount(){
        this.loadData(this.props.timeSpan, true)
        this.listener = DeviceEventEmitter.addListener('favoriteChanged_trending', ()=>{
            this.isFavoriteChanged = true
        })
    }
    componentWillUnmount(){
        this.listener && this.listener.remove()
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.timeSpan!==this.props.timeSpan){
            this.loadData(nextProps.timeSpan)
        }else if(this.isFavoriteChanged){
            this.isFavoriteChanged = false
            this.getFavoriteKeys()
        }
    }
    onUpdateFavorite() {
        this.getFavoriteKeys();
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
    onRefresh(){
        this.loadData(this.props.timeSpan, true)
    }
    loadData(timeSpan, isRefresh){
        this.updateState({isLoading: true})
        let url = this.getFetchUrl(this.props.tabLabel, timeSpan)
        dataRepository.fetchRepository(url)
            .then(result=>{
                this.items = result&&result.items?result.items:result?result:[]
                this.getFavoriteKeys()
                if(!this.items || isRefresh && result
                    &&result.update_date
                    &&!dataRepository.checkDate(result.update_date)
                ) return dataRepository.fetchNetRepository(url)
            })
            .then(items=>{
                if(!items || items.length === 0) return
                this.items = items
                this.getFavoriteKeys()
            })
            .catch(error=>{
                console.log(error)
                this.updateState({
                    isLoading: false
                });
            })
    }
    updateState(dic){
        if(!this)return
        this.setState(dic)
    }
    getFetchUrl(category, timeSpan){
        return API_URL+category+'?'+timeSpan.searchText
    }
    onSelect(_projectModel){
        this.props.navigation.navigate('ReponsitoryDetail', {
            projectModel: _projectModel,
            flag: FLAG_STORAGE.flag_trending,
            ...this.props,
            onUpdateFavorite: ()=>this.onUpdateFavorite(),
        })
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
            favoriteDao.saveFavoriteItem(_item.fullName, JSON.stringify(_item))
        } else {
            favoriteDao.removeFavoriteItem(_item.fullName)
        }
    }
    renderRow(projectModel){
        return <TrendingCell 
            key={projectModel.item.fullName}
            theme={this.state.theme}
            projectModel={projectModel}
            // onSelect={()=>ActionUtils.onSelectRepository({
            //     projectModel: projectModel,
            //     flag: FLAG_STORAGE.flag_trending,
            //     ...this.props,
            //     onUpdateFavorite: ()=>this.onUpdateFavorite(),
            // })}
            // onFavorite={(item, isFavorite)=>ActionUtils.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_trending)}
            onSelect={()=>this.onSelect(projectModel)}
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
                    onRefresh={()=>this.onRefresh()}
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