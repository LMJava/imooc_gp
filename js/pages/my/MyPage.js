import React, { Component } from 'react';
import {
    RefreshControl,
    FlatList,
    TextInput,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import NavigationBar from '../../common/NavigationBar'

export default class MyPage extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={'我的'}
                    statusBar = {{backgroundColor: '#2196F3'}}
                />
                <Text
                    style={styles.tips}
                    onPress={()=>{
                        this.props.navigation.navigate('CustomKey', { ...this.props })
                    }}
                >
                    自定义标签
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})