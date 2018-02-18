'use Strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

export default class Login extends Component<Props> {

	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.logo}
				source = {require('./Images/Octocat.jpg')} />
				<Text style = {styles.heading}> Github Octocat </Text>
				<TextInput style ={styles.input}
				onChangeText={(text)=>this.setState({username:text})}
				placeholder = "Enter Your Username" />
				<TextInput style ={styles.input}
				onChangeText={(text)=>this.setState({password:text})}
				placeholder = "Enter Your Password" 
				secureTextEntry = "true" />
				<TouchableHighlight style = {styles.button}>
				<Text style={styles.buttonText}> Submit </Text>
				</TouchableHighlight>
			</View>
		);
	}

}

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
		paddingTop: 40,
		alignItems: 'center',
		padding: 10,
	},
	logo: {
		width: 65,
		height: 55
	},
	heading: {
		fontSize: 30,
		marginTop: 10,
	},
	input: {
		height: 50,
		marginTop: 10,
		padding: 4,
		fontSize: 18,
		borderWidth: 1, 
		borderColor: '#48bbec'
	},
	button: {
		height: 50,
		backgroundColor: '#48BBEC',
		alignSelf: 'stretch',
		marginTop: 10,
		justifyContent: 'center',
	},
	buttonText: {
		fontSize: 22,
		color: '#FFF',
		alignSelf: 'center',
	}
});