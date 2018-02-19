/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Login from './login.js'
import AppContainer from './AppContainer.js'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      loggedIn:false,
    }

    this.onLogin = this.onLogin.bind(this);
  }


  onLogin(){
    this.setState({loggedIn: true})
  }

  render() {
    if (this.state.loggedIn){
      return (<AppContainer/>)
    } else {
          return (
      <Login onLogin = {this.onLogin}/>
    );
    }
  }
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
