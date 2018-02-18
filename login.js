'use Strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';

export default class Login extends Component<Props> {

	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.logo}
				source = {require('./Images/Octocat.jpg')} />
				<Text style = {styles.heading}> Github Octocat </Text>
				<TextInput style ={styles.input}
				placeholder = "Enter Your Username" />
				<TextInput style ={styles.input}
				placeholder = "Enter Your Password" 
				secureTextEntry = "true" />
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
	}
});