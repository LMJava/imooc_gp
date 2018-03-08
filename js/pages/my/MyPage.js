import React, { Component } from 'react';
import {
    TouchableOpacity,
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
                <TouchableOpacity
                    onPress={()=> this.props.navigation.navigate('CustomKey', { 
                        ...this.props, 
                        flag: FLAG_LANGUAGE.flag_key
                    })}
                >
                    <Text style={[styles.tips, {marginTop: 10}]}>自定义标签</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> this.props.navigation.navigate('SortKey', { 
                        ...this.props, 
                        flag: FLAG_LANGUAGE.flag_key
                    })}
                >
                    <Text style={styles.tips}>标签排序</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> this.props.navigation.navigate('CustomKey', { 
                        ...this.props, 
                        flag: FLAG_LANGUAGE.flag_key, 
                        isRemoveKey: true 
                    })}
                >
                    <Text style={styles.tips}>标签移除</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> this.props.navigation.navigate('CustomKey', { 
                        ...this.props, 
                        flag: FLAG_LANGUAGE.flag_language
                    })}
                >
                    <Text style={styles.tips}>自定义语言</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> this.props.navigation.navigate('SortKey', { 
                        ...this.props, 
                        flag: FLAG_LANGUAGE.flag_language 
                    })}
                >
                    <Text style={styles.tips}>语言排序</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> this.props.navigation.navigate('CustomKey', { 
                        ...this.props, 
                        flag: FLAG_LANGUAGE.flag_language, 
                        isRemoveKey: true 
                    })}
                >
                    <Text style={styles.tips}>语言移除</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        padding: 15,
        color: '#333',
        fontSize: 12,
        backgroundColor: '#FFF',
        borderBottomWidth: .5,
        borderBottomColor: '#E5E5E5'
    }
})