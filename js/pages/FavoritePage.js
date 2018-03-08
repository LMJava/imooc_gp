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
import {FLAG_STORAGE} from '../expand/dao/DataRepository'
import FavoriteDao from '../expand/dao/FavoriteDao'
import ProjectModel from '../model/ProjectModel'
import Utils from '../util/Utils'
import ArrayUtils from '../util/ArrayUtils'
import TrendingCell from '../common/TrendingCell';

export default class FavoritePage extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={'收藏'}
                    statusBar = {{backgroundColor: '#2196F3'}}
                />
                <ScrollableTabView
                    tabBarBackgroundColor="#2196F3"
                    tabBarInactiveTextColor='mintcream'
                    tabBarActiveTextColor='white'
                    tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                    renderTabBar={() => <ScrollableTabBar/>}
                >
                    <FavoriteTab tabLabel='最热' flag={FLAG_STORAGE.flag_popular} {...this.props} />
                    <FavoriteTab tabLabel='趋势' flag={FLAG_STORAGE.flag_trending} {...this.props} />
                </ScrollableTabView>
            </View>
        )
    }
}
class FavoriteTab extends Component {
    constructor(props){
        super(props)
        this.favoriteDao = new FavoriteDao(this.props.flag)
        this.unFavoriteItems = []
        this.state={
            dataSourse: '',
            isLoading: false,
            favoriteKeys: []
        }
    }
    componentDidMount(){
        this.loadData(true)
    }
    componentWillReceiveProps(nextProps) {
        this.loadData(false);
    }
    
    onUpdateFavorite() {
        this.getFavoriteKeys();
    }
    loadData(isShowLoading){
        if (isShowLoading) this.setState({isLoading: true})
        this.favoriteDao.getAllItems()
            .then(items=>{
                var resultData = []
                for(let i = 0, len = items.length; i<len; i++){
                    resultData.push(new ProjectModel(items[i], true))
                }
                this.updateState({
                    isLoading: false,
                    dataSourse: resultData
                })
            })
            .catch(e=>{
                this.updateState({
                    isLoading: false
                })
            })
    }
    updateState(dic){
        if(!this)return
        this.setState(dic)
    }
    onSelect(_projectModel){
        this.props.navigation.navigate('ReponsitoryDetail', {
            projectModel: _projectModel,
            flag: FLAG_STORAGE.flag_popular,
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
        var key = this.props.flag === FLAG_STORAGE.flag_popular 
            ? this.projectModel.item.id.toString() 
            : this.projectModel.item.fullName
        if(_isFavorite){
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(_item))
        } else {
            this.favoriteDao.removeFavoriteItem(key)
        }
        ArrayUtils.updateArray(this.unFavoriteItems, _item)
        if(this.unFavoriteItems.length > 0){
            if(this.props.flag === FLAG_STORAGE.flag_popular) {
                DeviceEventEmitter.emit('favoriteChanged_popular')
            } else {
                DeviceEventEmitter.emit('favoriteChanged_trending')
            }
        }
    }
    renderRow(_projectModel){
        let CellComponent=this.props.flag === FLAG_STORAGE.flag_popular 
            ? RepositoryCell
            : TrendingCell
        return <CellComponent 
            key={this.props.flag === FLAG_STORAGE.flag_popular
                ? _projectModel.item.id
                : _projectModel.item.fullName
            }
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
                enableEmptySections={true}
                refreshControl={<RefreshControl
                    colors={['#2196F3']}
                    tintColor={'#2196F3'}
                    title={'Loading...'}
                    titleColor={'#2196F3'}
                    refreshing={this.state.isLoading}
                    onRefresh={()=>this.loadData(true)}
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