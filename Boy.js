import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet
}from 'react-native'
import Girl from './Girl'

class Boy extends Component {
    constructor(props){
        super(props)
        this.state={
            word: ''
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>I am boy</Text>
                <Text
                    style={styles.text}
                >
                    送女孩一朵玫瑰
                </Text>
                <Text style={styles.text}>{this.state.word}</Text>
            </View>
        )
    }
}
const styled=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'gray',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
    }
})
