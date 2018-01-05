import React, { Component } from 'react';
import {
    Alert,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import SortableListView from 'react-native-sortable-listview'

import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../util/ViewUtils'
import ArrayUtils from '../../util/ArrayUtils'
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'

export default class SortKeyPage extends Component {
    constructor(props){
        super(props)
        this.dataArray=[]
        this.sortResultArray=[]
        this.originalCheckArray=[]
        this.state={
            checkedArray:[]
        }
    }
    componentDidMount(){
        this.languageDao = new LanguageDao(this.props.navigation.state.params.flag)
        this.loadData()
    }
    loadData(){
        this.languageDao.fetch()
            .then(result => {
                this.getCheckedItems(result)
            })
            .catch(error => {

            })
    }
    onBack(){
        if(ArrayUtils.isEqual(this.originalCheckArray, this.state.checkedArray)){
            this.props.navigation.goBack()
        } else {
            Alert.alert(
                '提示',
                '要保存修改吗？',
                [
                    {text: '不保存', onPress:()=>this.props.navigation.goBack(), style: 'cancel'},
                    {text: '保存', onPress:()=>this.onSave(true)},
                ]
            )
        }
    }
    onSave(isChecked){
        if(isChecked || !ArrayUtils.isEqual(this.originalCheckArray, this.state.checkedArray)){
            this.getSortResult()
            this.languageDao.save(this.sortResultArray)
        }
        this.props.navigation.goBack()
    }
    getSortResult(){
        this.sortResultArray=ArrayUtils.clone(this.dataArray)
        for(let i=0,l=this.originalCheckArray.length;i<l;i++){
            let item=this.originalCheckArray[i]
            let index=this.dataArray.indexOf(item)
            this.sortResultArray.splice(index, 1, this.state.checkedArray[i])
        }
    }
    getCheckedItems(result){
        let checkedArray = []
        this.dataArray=result
        for(let i=0, len=result.length;i<len;i++){
            let data = result[i]
            if(data.checked)checkedArray.push(data)
        }
        this.setState({
            checkedArray: checkedArray
        })
        this.originalCheckArray = ArrayUtils.clone(checkedArray)
    }
    render(){
        let title = this.props.navigation.state.params.flag === FLAG_LANGUAGE.flag_language ? '语言排序' : '标签排序'
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={title}
                    statusBar = {{backgroundColor: '#2196F3'}}
                    leftButton = {ViewUtils.getLeftBtn(()=>this.onBack())}
                    rightButton = {ViewUtils.getRightButton('保存', ()=>this.onSave())}
                />
                <SortableListView
                    style={{flex: 1}}
                    data = {this.state.checkedArray}
                    order = {Object.keys(this.state.checkedArray)}
                    onRowMoved = {e=>{
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                        this.forceUpdate()
                    }}
                    renderRow={row=><SortCell data={row} />}
                />
            </View>
        )
    }
}
class SortCell extends Component{
    render(){
        return <TouchableHighlight
            underlayColor={'#eee'}
            style={this.props.data.checked ? styles.item : styles.hidden}
            {...this.props.sortHandlers}>
            <View style={{marginLeft: 10, flexDirection: 'row'}}>
                <Image source={require('./img/ic_sort.png')} resizeMode='stretch' style={styles.itemImage}/>
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    title: {
        fontSize: 18,
        color: 'white',
    },
    hidden: {
        height: 0
    },
    item: {
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 50,
        justifyContent: 'center'
    },
    itemImage: {
        opacity: 1,
        width: 16,
        height: 16,
        marginRight: 10,
        tintColor:'#2196F3'
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})