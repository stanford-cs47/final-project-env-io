/*
  This file is the main file that runs the app.
  Most functionality is distibuted to navigation.
*/

import React from 'react';
import { AsyncStorage, } from 'react-native';
import AppNavigation from './App/Navigation/AppNavigation';
import LoginScreen from './App/Screens/LoginScreen';
import firebase from 'firebase';
import {firestore, storage} from './firebase.js'

export default class App extends React.Component {

  constructor(props) {
    super(props);

//MAKE SURE LOGGED IN STATE IS FALSE WHEN DONE WITH APP
    this.state = {
      loggedIn: false,
      unsubscribe: null,
      user: null,
    }
  }



  // Check out this link to learn more about firebase.auth()
  // https://firebase.google.com/docs/reference/node/firebase.auth.Auth
  componentDidMount() {

    //sign out implemented elsewhere - check the navigation tab 
    // This auto detects whether or not a user is signed in.
    let unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });

    this.setState({ unsubscribe });
  }

  componentWillUnmount() {
    this.state.unsubscribe();
  }



  render() {
    if (this.state.loggedIn) {
      return<AppNavigation />
    } else {
      return <LoginScreen />
    }
  }
}
