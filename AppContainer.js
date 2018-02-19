'use strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TabBarIOS,
  View
} from 'react-native';

import Login from './login.js'

export default class AppContainer extends Component{

  constructor(props){
    super(props);

    this.state = {
    	selectedTab: 'Feed',
    }

  }


  render() {
  	return (
  	<TabBarIOS style = {styles.container}> 
	  	<TabBarIOS.Item
	  	title = "Feed"
	  	selected = {this.state.selectedTab === 'feed'}
	  	//icon={require('./Images/Octocat.png')}
	  	onPress={()=> this.setState({selectedTab: 'feed'})}>
		  	<Text style = {styles.welcome}> Tab1 </Text>
	  	</TabBarIOS.Item>  
	  	<TabBarIOS.Item
	  	title = "Search"
	  	selected = {this.state.selectedTab === 'search'}
	  	//icon={require('./Images/Octocat.png')}
	  	onPress={()=> this.setState({selectedTab: 'search'})}>
		  	<Text style = {styles.welcome}> Tab2 </Text>
	  	</TabBarIOS.Item>  
  	</TabBarIOS>
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
    textAlign: 'center',
    margin: 10,
  },
});