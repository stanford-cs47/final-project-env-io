//this is not in its final state


import React from 'react';
import { StyleSheet, 
  Text, 
  SafeAreaView, 
  View, 
  TextInput, 
  Button, 
  Image,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';
import { material } from 'react-native-typography';
import  {firestore,
  storage 
} from '../../firebase.js';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    
    return { 
      headerTitle: (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={material.body2}>Unsplash</Text>
        <Text style={[material.caption, {fontSize: 10}]}>Login</Text>
        </View>
        )
      };
    };
    
    //make sure to store the username somewhere
    constructor(props) {
      super(props);
      
      this.state = {
        signUpUsername: '',
        signUpEmail: '',
        signUpPassword: '',
        loginEmail: '',
        loginPassword: '',
        errorMessageLogin: '',
      }
    }
    
    // Check out this link to learn more about firebase.auth()
    // https://firebase.google.com/docs/reference/node/firebase.auth.Auth
    signUp = async () => {
      try {
        const response = await firebase.auth().createUserWithEmailAndPassword(this.state.signUpEmail, this.state.signUpPassword);
        if(response.user) {
          const user = firebase.auth().currentUser;
          var userDocRef = firestore.doc('UsersCollection/' + user.uid);
          
          // userDocRef.set will create the document because it does not yet exist (even though we've created a reference)
          await userDocRef.set({
            'UserName' : this.state.signUpUsername,
            'Points' : 0,
          });
        }
      } catch (err) {
        console.log(err);
        let text = err['message'];
        Alert.alert(
          'There was a problem with your attempt to sign up.',
          text,
          [
            {text: 'Got it!'},
          ],
          {cancelable: false},
        );
      }
    }
    
    // Check out this link to learn more about firebase.auth()
    // https://firebase.google.com/docs/reference/node/firebase.auth.Auth
    login = async () => {
      try {
        // Note that we don't have to tell the app that the user has logged in.
        // firebase.auth().onAuthStateChanged() in App.js communicates this for us!
        await firebase.auth().signInWithEmailAndPassword(this.state.loginEmail, this.state.loginPassword);
      } catch (err) {
        console.log(err);
        let text = err['message'];
        Alert.alert(
          'There was a problem with your attempt to login.',
          text,
          [
            {text: 'Got it!'},
          ],
          {cancelable: false},
        );
      }
    }
    
    render() {
      return (
        <SafeAreaView style={styles.container}>
          <ImageBackground source={require('../Images/Backgrounds/gradient.png')}
            imageStyle={{resizeMode: 'stretch'}}
            style={styles.backgroundImage}
          >
        
            <Image source={require('../Images/logo.png')} 
              style={styles.logo1}
              resizeMode={'contain'}
            />

            <Image source={require('../Images/logo-text.png')} 
              style={styles.logo2}
              resizeMode={'contain'}
           />
        
        {/*this is where the signup input begins*/}
            <TextInput
              style={styles.input}
              autoCapitalize={'none'}
              value={this.state.signUpUsername}
              onChangeText={(signUpUsername) => this.setState({ signUpUsername })}
              placeholder="Username" 
            />
            <TextInput
              style={styles.input}
              autoCapitalize={'none'}
              value={this.state.signUpEmail}
              onChangeText={(signUpEmail) => this.setState({ signUpEmail })}
             placeholder="Email" 
            />
            <TextInput
              style={styles.input}
              autoCapitalize={'none'}
              value={this.state.signUpPassword}
              secureTextEntry={true}
              onChangeText={(signUpPassword) => this.setState({ signUpPassword })}
              placeholder="Password" 
            />
            <Button
              title="Sign Up"
              onPress={()=> this.signUp()}
              color='#2EC623'
              style={styles.button}
            />
        
        {/*this is where the login input begins*/}
            <TextInput
              style={[styles.input, {marginTop: 50}]}
              autoCapitalize={'none'}
             value={this.state.loginEmail}
              onChangeText={(loginEmail) => this.setState({ loginEmail })}
              placeholder="Email" 
           />
           <TextInput
              style={styles.input}
              autoCapitalize={'none'}
             value={this.state.loginPassword}
             secureTextEntry={true}
             onChangeText={(loginPassword) => this.setState({ loginPassword })}
              placeholder="Password" 
            />
            <Button
             title='Login'
             onPress={()=> this.login()}
             color='#2EC623'
            />
        
          </ImageBackground>    
         </SafeAreaView>
        );
      }
    }
    
    const styles = StyleSheet.create({
      
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      
      input: {
        width: '90%',
        fontSize: 20,
        marginBottom: 10,
        backgroundColor: 'whitesmoke',
        padding: 5,
        borderRadius: 5,
      },

      backgroundImage: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: (Dimensions.get('window').height),
        width: (Dimensions.get('window').width),
      },
      
      button: {
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#b1b6b1',
        height: '6%',
      },
      
      logo1: {
        width: '40%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      logo2: {
        width: '70%',
        height: '8%',
        marginBottom: 10,
      },
      
    });
    