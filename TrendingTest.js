import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import GitHubTrending from 'GitHubTrending'
import NavigationBar from './js/common/NavigationBar'

const URL = 'https://github.com/trending/'

export default class TrendingTest extends Component {
    constructor(props) {
        super(props);
        this.trending = new GitHubTrending()
        this.state = {
            result: '',
        }
    }
    onLoad() {
        let url = URL + this.text
        this.trending.fetchTrending(url)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <NavigationBar title={'GitHubTrending的使用'} />
                <TextInput
                    style={{ height: 30, borderWidth: 1, padding: 0 }}
                    onChangeText={text => this.text = text}
                    underlineColorAndroid="transparent"
                />
                <Text style={styles.text} onPress={() => this.onLoad()}>
                    加载数据
                </Text>
                <Text style={{ flex: 1 }}>{this.state.result}</Text>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    tips: {
        fontSize: 18,
    },
    row: {
        height: 50,
    },
    line: {
        height: 1,
        backgroundColor: 'black',
    },
})