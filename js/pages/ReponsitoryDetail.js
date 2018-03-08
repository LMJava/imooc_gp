import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    WebView,
    TextInput,
    DeviceEventEmitter,
    TouchableOpacity,
} from 'react-native'
import ViewUtils from '../util/ViewUtils'
import NavigationBar from '../common/NavigationBar'
import FavoriteDao from '../expand/dao/FavoriteDao'

const TRENDING_URL = 'https://github.com/'

export default class ReponsitoryDetail extends Component {
    constructor(props){
        super(props)
        this.projectModel=this.props.navigation.state.params.projectModel
        this.favoriteDao = new FavoriteDao(this.props.navigation.state.params.flag)
        this.state={
            url: this.projectModel.item.html_url ? this.projectModel.item.html_url : TRENDING_URL + this.projectModel.item.fullName,
            title: this.projectModel.item.full_name ? this.projectModel.item.full_name : this.projectModel.item.fullName,
            canGoBack: false,
            isFavorite: this.projectModel.isFavorite,
            favoriteIcon: this.projectModel.isFavorite
                ? require('../../res/images/ic_star.png') 
                : require('../../res/images/ic_star_navbar.png')
        }
    }

    componentWillUnmount() {
        if (this.props.navigation.state.params
            && this.props.navigation.state.params.onUpdateFavorite){
            this.props.navigation.state.params.onUpdateFavorite();
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
    setFavoriteState(_isFavorite){
        this.setState({
            isFavorite: _isFavorite,
            favoriteIcon: _isFavorite 
                ? require('../../res/images/ic_star.png') 
                : require('../../res/images/ic_star_navbar.png')
        })
    }
    onRightButtonClick(){
        this.setFavoriteState(this.projectModel.isFavorite=!this.projectModel.isFavorite)
        var key = this.projectModel.item.fullName ? this.projectModel.item.fullName : this.projectModel.item.id.toString()
        if(this.projectModel.isFavorite){
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(this.projectModel.item))
        } else {
            this.favoriteDao.removeFavoriteItem(key)
        }
    }
    renderRightButton(){
        return<TouchableOpacity
            onPress={()=>this.onRightButtonClick()}
        >
            <Image
                style={{width: 20, height: 20, marginRight: 10}}
                source={this.state.favoriteIcon}
            />
        </TouchableOpacity>
    }
    render(){
        return <View style={styles.container}>
            <NavigationBar
                title = {this.state.title}
                leftButton={ViewUtils.getLeftBtn(()=>this.onBack())}
                rightButton={this.renderRightButton()}
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