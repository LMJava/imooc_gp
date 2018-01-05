import React, { Component } from 'react';
import {
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
} from 'react-native';
import CheckBox from 'react-native-check-box'
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../util/ViewUtils'
import ArrayUtils from '../../util/ArrayUtils'
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'

export default class CustomKeyPage extends Component {
    constructor(props){
        super(props)
        this.isRemoveKey = this.props.navigation.state.params.isRemoveKey ? true : false
        this.changeValues=[]
        this.state={
            dataArray:[],
        }
    }
    componentDidMount(){
        this.LanguageDao = new LanguageDao(this.props.navigation.state.params.flag)
        this.loadData()
    }
    loadData(){
        this.LanguageDao.fetch()
            .then(result=>this.setState({dataArray: result}))
            .catch(error=>console.log(error))
    }
    onSave(){
        if(this.changeValues.length!==0){
            if(this.isRemoveKey){
                for(let i=0, l=this.changeValues.length;i<l;i++){
                    ArrayUtils.remove(this.state.dataArray, this.changeValues[i])
                }
            }
            this.LanguageDao.save(this.state.dataArray)
        }
        this.props.navigation.goBack()
    }
    onBack(){
        if(this.changeValues.length!==0){
            Alert.alert(
                '提示',
                '要保存修改吗？',
                [
                    {text: '不保存', onPress:()=>this.props.navigation.goBack(), style: 'cancel'},
                    {text: '保存', onPress:()=>this.onSave()},
                ]
            )
        } else {
            this.props.navigation.goBack()
        }
    }
    renderView(){
        if(!this.state.dataArray || this.state.dataArray.length === 0)return
        let len = this.state.dataArray.length
        let views = []
        for (let i = 0, l=len-2; i < l; i+=2 ){
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i+1])}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        views.push(
            <View key={len-1}>
                <View style={styles.item}>
                    {len%2===0?this.renderCheckBox(this.state.dataArray[len-2]):null}
                    {this.renderCheckBox(this.state.dataArray[len-1])}
                </View>
                <View style={styles.line}/>
            </View>
        )
        return views
    }
    renderCheckBox(data){
        let leftText = data.name
        return(
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick = {()=>this.onClick(data)}
                leftText = {leftText}
                isChecked={this.isRemoveKey ? false : data.checked}
                checkedImage={<Image 
                    style={{tintColor: '#6495ED'}}
                    source={require('./img/ic_check_box.png')} 
                />}
                unCheckedImage={<Image 
                    style={{tintColor: '#6495ED'}}
                    source={require('./img/ic_check_box_outline_blank.png')} 
                />}
            />
        )
    }
    onClick(data){
        if(!this.isRemoveKey) data.checked=!data.checked
        ArrayUtils.updateArray(this.changeValues, data)
    }
    render(){
        let rightButtonTitle=this.isRemoveKey? '移除':'保存'
        let title = this.props.navigation.state.params.flag === FLAG_LANGUAGE.flag_language ? '语言' : '标签'
        title = this.isRemoveKey ? title + '移除' : '自定义' + title
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={title}
                    statusBar = {{backgroundColor: '#2196F3'}}
                    leftButton = {ViewUtils.getLeftBtn(()=>this.onBack())}
                    rightButton = {ViewUtils.getRightButton(rightButtonTitle,()=>this.onSave())}
                />
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 18,
        color: 'white',
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})