import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import HTMLView from 'react-native-htmlview'

export default class TrendingCell extends Component {
    render(){
        let data = this.props.data
        let description = '<p>' + data.description + '</p>'
        return(
            <TouchableOpacity 
                style={styles.container}
                onPress={this.props.onSelect}
            >
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{data.fullName}</Text>
                    <HTMLView
                        value={description}
                        onLinkPress={(url) => {
                        }}
                        stylesheet={{
                            p:styles.description,
                            a:styles.description,
                        }}
                    />
                    <Text style={[styles.description, {fontSize: 14}]}>
                        {data.meta}
                    </Text>
                    <View style={styles.row}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.description}>Built by: </Text>
                            {data.contributors.map((result, i, arr) => {
                                return <Image
                                    key={i}
                                    style={{width: 22, height: 22,margin:2}}
                                    source={{uri: arr[i]}}
                                />
                            })
                            }
                        </View>
                        <Image
                            style={{width: 22, height: 22}}
                            source={require('../../res/images/ic_star.png')}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
        flex: 1
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width:0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation:2
    },
    author: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
})
