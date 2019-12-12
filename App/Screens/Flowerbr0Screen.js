import React from 'react';
import { StyleSheet, 
  Text, 
  SafeAreaView, 
  View, 
  TextInput, 
  Button, 
  Image,
  AsyncStorage, 
  Dimensions,
  ImageBackground,
  Alert,
} from 'react-native';
import { material } from 'react-native-typography';
import { firestore,
  storage, 
} from '../../firebase';
import firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

//Your Components and Resources
export default class Flowerbr0Screen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return { 
      headerTitle: (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[material.caption, {fontSize: 10}]}></Text>
        </View>
      )
    };
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>

        <ImageBackground source={require('../Images/Backgrounds/beach.jpg')} imageStyle={{resizeMode: 'cover'}} style={styles.backgroundImage} >

          <View styles={styles.forefront}>

            <Image style={styles.avatar} resizeMode={'contain'} source={require('../Images/flowerbr0_with_name.png')} />
            <Button 
              /*disabled*/
              style={styles.button}
              title='Previous Activities'
              color='#2EC623'
              onPress={() => {
                Alert.alert(
                  'Activity Log',
                  'Signed a petition \"Leave the Endangered Species Act Alone\"\n\nIs attending \"Sustainability & Infrastructure Commission Meeting\"\n\nApplied to an internship \"Sierra Club Fundraising Intern\"\n\nCompleted the challenge \"Tour a Factory Farm and Upload Your Saddest Photo\"\n\nAttended the event \"Fossil Free Stanford Divest the Rest Rally\"'  
                )
              }}
            />
          
          </View>

        </ImageBackground>

      </SafeAreaView>
    );
}
}

const styles = StyleSheet.create({

  container: {
    /*flex: 1,*/
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: (Dimensions.get('window').height),
    width: (Dimensions.get('window').width),
  },

  forefront: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },

  avatar: {
    height: (Dimensions.get('window').height) / 3,
    width: (Dimensions.get('window').width) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    marginTop: '10%',
    borderRadius: 7,
    backgroundColor: '#2EC623',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: '#00A22E',
    borderWidth: 3,
    alignSelf: 'flex-end'
  },

  text: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2EC623',
    fontFamily: 'Georgia',
    fontSize: 24,
  },

});