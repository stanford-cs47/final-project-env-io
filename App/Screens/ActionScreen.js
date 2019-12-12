import React from 'react';
import { StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Image, 
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import { firestore,
  storage, 
} from '../../firebase';
import firebase from 'firebase';

//Your Componenets
import ActionItem from './ActionItemScreen'
import Actions from '../Components/Actions'

//Third Party Components
import { FontAwesome } from '@expo/vector-icons'; 

export default class ActionScreen extends React.Component {

  state = {
    loading: true,
    actions : [],
  }

  componentDidMount() {
    this.loadActions();
    console.log('component mounted')
  }

  actionRender = () => {
    if (this.state.loading) {  
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
         <ActivityIndicator style={styles.activityIndicator} size='large' color='black'/>
        </View>
      )
    }
    else {
      return (
        <View style={{flex: 1}}>
         <Actions feed={this.state.actions} navigation={this.props.navigation} />
        </View>
      )
    }
  }

  //get the shit from firebase
  async loadActions() {
    this.setState({actions:[], loading: true});
    var resultActions = [];
    for (i = 1; i <= 4; i++) {
      console.log('for loop enetered')
      try {
        const docref = firestore.doc('ActionMasterCollection/Action' + i); 
        let doc = await docref.get();
        const picRef = storage.ref('Actions').child('action'+i+'.png');
        let picURL = await picRef.getDownloadURL();
        console.log('url received')
        if (doc.exists) {
          let title = await doc.get('Title');
          let gems = await doc.get('Gems');
          let description = await doc.get('Description');
          let actionObject = {
            Title: title,
            Gems: gems,
            Pic: picURL,
            Description: description,
          }
          resultActions.push(actionObject);
        }
      } catch(err) {
        console.log(err);
      }
    }
    console.log(resultActions);
    this.setState({loading: false, actions: resultActions})
  }

  render() {
    const {actions, loading} = this.state;

    console.log('running action screen')

    return (
      <SafeAreaView style={styles.container}>

        {this.actionRender()}

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  logo: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    height: (Dimensions.get('window').width) / 5.1,
  },

  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },

});
