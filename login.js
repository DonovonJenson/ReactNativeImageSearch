'use Strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
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
	},
	logo: {
		width: 65,
		height: 55
	},
	heading: {
		fontSize: 30,
		marginTop: 10,
	}
});