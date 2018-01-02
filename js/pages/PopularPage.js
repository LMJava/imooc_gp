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
import DataRepository from '../expand/dao/DataRepository'
import RepositoryCell from '../common/RepositoryCell'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

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
            .then(result=>this.setState({languages: result}))
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
                    return lan.checked ? <PopularTab key={i} tabLabel={lan.name} ></PopularTab> : null
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
        this.dataRepository = new DataRepository()
        this.state={
            dataSourse: '',
            isLoading: false,
        }
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        this.setState({isLoading: true})
        let url = URL+this.props.tabLabel+QUERY_STR
        this.dataRepository.fetchRepository(url)
            .then(result=>{
                let items = result&&result.items?result.items:result?result:[]
                this.setState({
                    dataSourse: items,
                    isLoading: false
                })
                DeviceEventEmitter.emit('showToast', '显示本地数据')
                if(result
                    &&result.update_date
                    &&!this.dataRepository.checkDate(result.update_date)
                ) return this.dataRepository.fetchNetRepository(url)
            })
            .then(items=>{
                if(!items || items.length === 0) return
                this.setState({
                    dataSourse: items,
                })
                DeviceEventEmitter.emit('showToast', '显示网络数据')                
            })
            .catch(error=>{
                console.log(error)
            })
    }
    renderRow(item){
        return <RepositoryCell data={item}/>
    }
    render(){
        return <View style={{flex: 1}}>
            <FlatList
                keyExtractor={(item, index)=>(item+index)}
                data={this.state.dataSourse}
                renderItem={(item)=>this.renderRow(item.item)}
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
        flex: 1,
    }
})