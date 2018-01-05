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

import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'

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
                        this.props.navigation.navigate('CustomKey', { 
                            ...this.props, 
                            flag: FLAG_LANGUAGE.flag_key
                        })
                    }}
                >
                    自定义标签
                </Text>
                <Text
                    style={styles.tips}
                    onPress={()=>{
                        this.props.navigation.navigate('SortKey', { 
                            ...this.props, 
                            flag: FLAG_LANGUAGE.flag_key
                        })
                    }}
                >
                    标签排序
                </Text>
                <Text
                    style={styles.tips}
                    onPress={()=>{
                        this.props.navigation.navigate('CustomKey', { 
                            ...this.props, 
                            flag: FLAG_LANGUAGE.flag_key, 
                            isRemoveKey: true 
                        })
                    }}
                >
                    标签移除
                </Text>
                <Text
                    style={styles.tips}
                    onPress={()=>{
                        this.props.navigation.navigate('CustomKey', { 
                            ...this.props, 
                            flag: FLAG_LANGUAGE.flag_language
                        })
                    }}
                >
                    自定义语言
                </Text>
                
                <Text
                    style={styles.tips}
                    onPress={()=>{
                        this.props.navigation.navigate('SortKey', { 
                            ...this.props, 
                            flag: FLAG_LANGUAGE.flag_language 
                        })
                    }}
                >
                    语言排序
                </Text>
                <Text
                    style={styles.tips}
                    onPress={()=>{
                        this.props.navigation.navigate('CustomKey', { 
                            ...this.props, 
                            flag: FLAG_LANGUAGE.flag_language, 
                            isRemoveKey: true 
                        })
                    }}
                >
                    语言移除
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 29
    }
})