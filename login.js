'use Strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator, 
  TouchableHighlight,
} from 'react-native';

import buffer from 'buffer';

export default class Login extends Component{

	constructor(props){
		super(props);
		this.state = {
			showProgress: false
		}

	}

	onLoginPressed(){
		console.log('Logging in as' + this.state.username)
		this.setState({showProgress: true})
		let b = new buffer.Buffer(`${this.state.username}:${this.state.password}`);
		var encodedAuth = b.toString('base64'); 

		fetch('https://api.github.com/user',{
			headers: {
				Authorization : 'Basic ' + encodedAuth
			}
		}).then((response) =>{
			if(response.status >= 200 && response.status < 300){
				return response;
			}

			throw {
				badCredentials: response.status === 401,
				unknownError: response.status !== 401,
			}

		}).then((response) =>{
			return response.json();
		}).then ((results) =>{
			console.log(results);
			this.setState({success:true});
		}).catch((err) => {
			this.setState(err)
		}). finally(()=>{
			this.setState({showProgress:false});
		})
	}

	render() {

		let errorCtrl = <View/>
		if (!this.state.success && (this.state.badCredentials || this.state.error)){
			errorCtrl = <Text style ={styles.error}>
			 That username and password didn't work
			 </Text>
		}
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
				secureTextEntry = {true} />
				<TouchableHighlight style = {styles.button}
				onPress={this.onLoginPressed.bind(this)}>
				<Text style={styles.buttonText}> Submit </Text>
				</TouchableHighlight>

				<ActivityIndicator
					animating = {this.state.showProgress}
					size ="large" 
					style={styles.activity}/>
				{errorCtrl}
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
	},
	activity: {
		marginTop: 20,
	},
	error: {
		color: 'red',
		paddingTop: 10,
	}
});