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
const data = {
  "result": [
    {
        "email": "f.lee@taylor.edu",
        "fullName": "张三张三张三张三"
    },
    {
        "email": "g.jackson@hall.net",
        "fullName": "张三张三张三张三张三"
    },
    {
        "email": "l.hall@rodriguez.com",
        "fullName": "张三张三张三张三"
    },
    {
        "email": "q.lopez@davis.io",
        "fullName": "张三张三张三张三"
    },
    {
        "email": "c.gonzalez@perez.net",
        "fullName": "张三张三张三"
    },
    {
        "email": "a.johnson@williams.net",
        "fullName": "张三张三"
    },
    {
        "email": "i.anderson@lopez.edu",
        "fullName": "张三张三"
    },
    {
        "email": "r.lee@davis.org",
        "fullName": "张三张三"
    },
    {
        "email": "o.young@lee.edu",
        "fullName": "张三张三张三张三张三"
    },
    {
        "email": "j.wilson@williams.org",
        "fullName": "张三张三张三张三张三"
    },
    {
        "email": "z.walker@jackson.io",
        "fullName": "张三张三"
    },
    {
        "email": "j.martinez@brown.gov",
        "fullName": "张三张三张三张三"
    },
    {
        "email": "y.martin@lewis.io",
        "fullName": "张三张三张三张三"
    },
    {
        "email": "w.taylor@gonzalez.org",
        "fullName": "张三张三"
    },
    {
        "email": "j.thomas@garcia.org",
        "fullName": "张三张三张三张三"
    }
],
  "statusCode": 0
}

export default class ListViewCmt extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedTab: 'tb_popular',
      dataSourse: data.result,
      isLoading: true,
    }
    this.onLoad()
  }
  renderButton(_image){
    return(
      <TouchableOpacity>
        <Image style={{width: 22,height: 22, margin: 5}} source ={_image}></Image>
      </TouchableOpacity>
    )
  }
  renderRow(item){
    return <View style={styles.row}>
      <TouchableOpacity
        onPress={()=>{this.toast.show('你单击了：' + item.item.fullName, DURATION.LENGTH_LONG)}}
      >
        <Text style={styles.tips}>{item.item.fullName}</Text>
        <Text style={styles.tips}>{item.item.email}</Text>
      </TouchableOpacity>
    </View>
  }
  renderSparator(){
    return <View style={styles.line}/>
  }
  renderFooter() {
    return (
        <Image
          style={{width: 300, height: 100}}
          source={{uri: 'https://images.gr-assets.com/hostedimages/1406479536ra/10555627.gif'}}
        />
    )
  }
  onLoad(){
    setTimeout(()=>{
      this.setState({
        isLoading: false
      })
    }, 2000)
  }
  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
            title = {'\\^v^/'}
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
        <FlatList
          data={this.state.dataSourse}
          renderItem={(item)=>this.renderRow(item)}
          ItemSeparatorComponent={()=>this.renderSparator()}
          ListFooterComponent={()=>this.renderFooter()}
          refreshControl={<RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={()=>this.onLoad()}
          />}
        />
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