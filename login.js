'use Strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Login extends Component<Props> {

	render() {
		return (
			<View style={styles.container}>
				<Text>Oh hai mark</Text>
			</View>
		);
	}

}

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1
	}
});