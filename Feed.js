'use strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ListView,
  ActivityIndicator,
  View
} from 'react-native';

import Login from './login.js'

export default class Feed extends Component{

  constructor(props){
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })

    this.state = {
      dataSource: ds.cloneWithRows(['A','B','C']),
      showProgress: true,
    }

  }

  componentDidMount(){
    this.fetchFeed();
  }

  renderRow(rowData){
    return <Text style = {styles.welcome}>
    {rowData}
    </Text>
  }

  fetchFeed(){
    var url = 'https://api.github.com/users/' + this.props.authInfo.user.login + '/received_events'
    fetch (url, {
      headers: this.props.authInfo.headers
    })
    .then ((response) => {
      return response.json()
    })
    .then ((responseData) => {
      this.setState({showProgress:false})
      var feedItems = 
        responseData.filter((ev) => {
          ev.type === 'PushEvent';
        })
        this.setState({dataSource: this.state.datasource.cloneWithrows(feedItems)})
    })
  }

  render() {
    if (this.state.showProgress){
      return (
        <View> 
          <ActivityIndicator
            size="large" 
            animating ={true}
          />
        </View>
        )
    }
  	return (
      <View style = {styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          />
      </View>
 )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    color: '#333',
    alignSelf: 'center',
    backgroundColor: '#FFF',
  },
});