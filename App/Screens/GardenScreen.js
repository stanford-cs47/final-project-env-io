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
  ImageBackground,
  AsyncStorage,
  Alert,
  ScrollView,
} from 'react-native';

import { List, ListItem, } from 'react-native-elements'

//Your Components and resources
import { firestore,
  storage, 
} from '../../firebase';
import firebase from 'firebase';

//Third Party Components
import { FontAwesome } from '@expo/vector-icons'; 
import Plant from '../Components/Plant';

const STOREDATA = [
  {
      plant: require('../Images/Crops/tomato.png'),
      price: 100,
      name: 'Tomato',
  },
  {
      plant : require('../Images/Crops/rambutan.png'),
      price: 150,
      name: 'Rambutan',
  },
  {
      plant: require('../Images/Crops/apple.png'),
      price: 200,
      name: 'Apple',
  },
  {
      plant: require('../Images/Crops/sunflower.png'),
      price: 50,
      name: 'Sunflower',
  },
]

export default class GardenScreen extends React.Component {

  state = {
    full: false,
    points: 0,
    fetched: false,
  }

  async componentDidMount() {
    if (!this.state.fetched) {
      try {
        const docref = firestore.doc('UsersCollection/' + firebase.auth().currentUser.uid); 
        let doc = await docref.get();
        if (doc.exists) {
          let points = doc.get('Points')
          this.setState({fetched: true, points: points,})
        }
      } catch(err) {
        console.log(err);
      }
    }
  }

  takePoints = async(price) => {
    let userPoints = 0;
    try {
        const docref = firestore.doc('UsersCollection/' + firebase.auth().currentUser.uid); 
        let doc = await docref.get();
        if (doc.exists) {
          userPoints = doc.get('Points');
        }
    } catch(err) {
        console.log(err);
    }
    if (userPoints >= price) {
      try {
        const docref = firestore.doc('UsersCollection/' + firebase.auth().currentUser.uid); 
        let doc = await docref.get();
        if (doc.exists) {
          await docref.set({'Points': (userPoints - price)}, {merge: true});
        }
      } catch(err) {
        console.log(err);
      }
      return true;
    } else return false;
}

  async putPlant(price) {
    if (this.state.full) {
      Alert.alert(
        'Garden Full',
        'You cannot put any more plants in your garden.',
        [
          {text: "I'll start harvesting.", onPress: () => console.log('garden full alert dismissed')},
        ],
        {cancelable: false},
      );
    } else {
      if (await this.takePoints(price)) {
        this.setState({full: true,})
        console.log('state set to full')
      } else {
        Alert.alert(
          "You don't have enough gems!",
          'You need to earn more gems to buy this plant.',
          [
            {text: "Time to be more green!", onPress: () => console.log('not enough points alert dismissed')},
          ],
          {cancelable: false},
        );
      }
    };
  }

  harvest = () => {
      Alert.alert(
        'You gained $15 in credit!',
        'Donate your credit to:',
        [
          {text: 'Environmental Defense Fund', onPress: () => this.donated() },
          {text: 'Rainforest Alliance', onPress: () => this.donated() },
          {text: 'World Wildlife Fund', onPress: () => this.donated() },
        ],
        {cancelable: false},
      );
      this.setState({full: false,})
      console.log('state set to not full')
  }

  donated = () => {
    Alert.alert(
      'You donated $15 in credit and unlocked a new item for your Avatar!',
      '',
      [
        {text: 'Awesome!'},
      ],
      {cancelable: false},
    );
  }

  gardenRender = () => {
    if (this.state.full) {
      return (
        <View style={styles.imageForeground}>
          <TouchableOpacity
          style={styles.touchablePlant}
          onPress={() => { this.harvest() }}
          >
            <Image source={require('../Images/Crops/bush.png')} style={styles.gardenBush} resizeMode={'contain'} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.imageForeground}></View>
      )
    }
  }

  render() {
    if (this.state.fetched) {
      return (
        <SafeAreaView style={styles.container}>
  
          <ImageBackground source={require('../Images/Backgrounds/garden.png')}
            imageStyle={{resizeMode: 'cover'}}
            style={styles.backgroundImage}
          >
  
            {this.gardenRender()}
  
          </ImageBackground>
  
          <ScrollView contentContainerStyle={styles.storeContainer}>
            <FlatList
              data={STOREDATA}
              style={{flex: 1,}}
              contentContainerStyle={{alignItems: 'center',}}
              renderItem={({ item }) => (
  
                <View style={styles.storeItem}>
  
                  <View style={styles.imageView}>
                    <Image source={item.plant} style={styles.plantPic} resizeMode={'contain'} />
                  </View>
                  
                  <TouchableOpacity 
                  style={styles.button}
                  onPress={() => { this.putPlant(item.price) }}
                  >
                    <View style={styles.textContainer}>
                      <Text style={styles.gemline}>{item.name}</Text>
                      <Text style={styles.gemline}>Plant: {item.price}<Image style={styles.gem} resizeMode={'contain'} source={require('../Images/gem.png')} /></Text>
                    </View>
                  </TouchableOpacity>
                </View>
  
              )} 
              keyExtractor={item => item.name} 
            />
                  
          </ScrollView>
  
        </SafeAreaView>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Contacting Server</Text>
        </View>
      );
    }    
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  storeContainer: {
    flexGrow: 1,
    width: Dimensions.get('window').get - 2,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 2,
  },

  backgroundImage: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    height: (Dimensions.get('window').height) / 3,
    width: (Dimensions.get('window').width),
    borderRadius: 10,
  },

  imageForeground: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: (Dimensions.get('window').height) / 3,
    width: (Dimensions.get('window').width),
    backgroundColor: 'transparent',
  },

  touchablePlant: {
    width: '20%',
    height: '30%',
    backgroundColor: 'transparent',
    marginBottom: '13%'
  },

  gardenBush: {
    width: '100%',
    height: '100%',
  },

  store: {
    backgroundColor: '#f6f6f6',
  },

  storeItem: {
    height: (Dimensions.get('window').height) / 8,
    width: '90%',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },

  imageView: {
    height: (Dimensions.get('window').height) / 8,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  plantPic: {
    height: (Dimensions.get('window').height) / 10,
    width: '98%',
    backgroundColor: '#dedede',
    borderRadius: 10,
    paddingVertical: (Dimensions.get('window').height) / 80,
    paddingHorizontal: '1%',
  },

  button: {
    height: (Dimensions.get('window').height) / 8,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    width: 125,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2EC623',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dedede',
  },

  gemline: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 15,
    borderRadius: 10,
    margin: 5,
  },

  gem: {
    width: 10,
    height: 16,
    backgroundColor: 'transparent',
    alignContent: 'center',
    justifyContent: 'center',
  },

});
