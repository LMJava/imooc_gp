import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    WebView,
    TextInput,
    DeviceEventEmitter,
} from 'react-native'
import ViewUtils from '../util/ViewUtils'
import NavigationBar from '../common/NavigationBar'
const URL = 'http://www.imooc.com'

export default class ReponsitoryDetail extends Component {
    constructor(props){
        super(props)
        this.item=this.props.navigation.state.params.item
        this.state={
            url: this.item.html_url,
            title: this.item.full_name,
            canGoBack: false
        }
    }
    onBack(){
        if(this.state.canGoBack){
            this.webView.goBack()
        } else {
            this.props.navigation.goBack()
        }
    }
    onNavigationStateChange(e){
        this.setState({
            canGoBack: e.canGoBack,
            url: e.url
        })
    }
    render(){
        return <View style={styles.container}>
            <NavigationBar
                title = {this.state.title}
                leftButton={ViewUtils.getLeftBtn(()=>this.onBack())}
            />
            <WebView 
                ref={webView=>this.webView=webView}
                source={{uri: this.state.url}}
                onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                startInLoadingState={true}
            />
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})