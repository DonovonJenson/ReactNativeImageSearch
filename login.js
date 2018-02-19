'use Strict';

const authKey = 'auth';
const userKey = 'user';

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
  AsyncStorage,
} from 'react-native';

import buffer from 'buffer';
import _ from 'lodash';

export default class Login extends Component{

	constructor(props){
		super(props);
		this.state = {
			showProgress: false
		}

	}

	getAuthInfo(){
		AsyncStorage.multiGet([authKey, userKey], (err, val) =>{
			if (err){
				return err
			}
			if (!val) {
				return 'Nothing saved';
			}
			var zippedObj = {
				'authKey': val[0][1],
				'userKey': val[1][1], 
			}
			if (!zippedObj.authKey){
				return; 
			}

			let authInfo = {
				header: {
					Authorization: 'Basic ' + zippedObj.authKey
				},
				user: JSON.parse(zippedObj.userKey)
			}
			if(authInfo){
				this.props.onLogin()
			};
		})
	}

	componentDidMount(){
		this.getAuthInfo();
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
			AsyncStorage.multiSet([
				[authKey, encodedAuth],
				[userKey, JSON.stringify(results)]
			], (err) => {
				if (err){
					throw err;
				}
			})
			this.setState({success:true});
		}).catch((err) => {
			this.setState(err)
		}). finally(()=>{
			this.setState({showProgress:false});
			if (this.state.success && this.props.onLogin){
				this.props.onLogin();
			}
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