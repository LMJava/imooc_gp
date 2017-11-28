import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    RefreshControl,
} from 'react-native'
import NavigationBar from './NavigationBar'
import Toast,{DURATION} from 'react-native-easy-toast'
import HttpUtil from './HttpUtils'

export default class FetchTest extends Component {
  constructor(props){
    super(props);
    this.state={
        result: '',
    }
  }
  renderButton(_image){
    return(
      <TouchableOpacity>
        <Image style={{width: 22,height: 22, margin: 5}} source ={_image}></Image>
      </TouchableOpacity>
    )
  }
  onLoad(url){
    // fetch(url)
    //     .then(response=>response.json())
    //     .then(result=>{
    //         this.setState({result:  JSON.stringify(result)})
    //     })
    //     .catch(error=>{
    //         this.setState({result: JSON.stringify(error)})
    //     })

    HttpUtil.get(url)
        .then(result=>{
            this.setState({result: JSON.stringify(result)})
        })
        .catch(error=>{
            this.setState({result: JSON.stringify(error)})
        })
  }
  doPost(url, data){
    // fetch(url, {
    //     method: 'POST',
    //     header: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // })
    //     .then(response=>response.json())
    //     .then(result=>{
    //         this.setState({result:  JSON.stringify(result)})
    //     })
    //     .catch(error=>{
    //         this.setState({result: JSON.stringify(error)})
    //     })

    HttpUtil.post(url, data)
    .then(result=>{
        this.setState({result: JSON.stringify(result)})
    })
    .catch(error=>{
        this.setState({result: JSON.stringify(error)})
    })
  }
  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
            title = {'\\^v^\\'}
            statusBar = {{
              backgroundColor: '#EE6363',
            }}
            style = {{
              backgroundColor: '#EE6363',
            }}
            leftButton = {
            this.renderButton(require('./res/images/ic_arrow_back_white_36pt.png'))
            }
            rightButton = {
            this.renderButton(require('./res/images/ic_star.png'))
            }
        />
        <Text style={styles.text} onPress={()=>this.onLoad('http://rap.taobao.org/mockjsdata/11793/test')}>
            加载数据：
        </Text>
        <Text style={styles.text} onPress={()=>this.doPost('http://rap.taobao.org/mockjsdata/11793/submit', {userName:'小明', password:'123456'})}>
            提交数据：
        </Text>
        <Text style={styles.text}>请求结果：{this.state.result}</Text>
        <Toast ref={toast=>{this.toast=toast}}/>
      </View>
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