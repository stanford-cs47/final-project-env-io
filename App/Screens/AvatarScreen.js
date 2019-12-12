import React from 'react';
import { StyleSheet, 
  Text, 
  SafeAreaView, 
  View, 
  TextInput, 
  Button, 
  Image,
  FlatList,
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

//Your Components and Resources
const DATA = [
{img: require('../Images/home-icon1.png'),
next: 'Action', 
},   
, {img: require('../Images/home-icon2.png'),
next: 'Community', 
}
];

const DATA2 = [
{img: require('../Images/home-icon3.png'),
next: 'Garden',
}
, {img: require('../Images/home-icon4.png'),
next: 'News',
}
];


export default class AvatarScreen extends React.Component {

  state = {
    fetched: false,
    username: '',
  }

  async componentDidMount() {
    if (!this.state.fetched) {
      try {
        const docref = firestore.doc('UsersCollection/' + firebase.auth().currentUser.uid); 
        let doc = await docref.get();
        if (doc.exists) {
          let username = doc.get('UserName')
          this.getPoints();
          this.setState({fetched: true, username: username,})
        }
      } catch(err) {
        console.log(err);
      }
    }
  }

  getPoints = () => {
    firestore.collection('UsersCollection').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot => {
      console.log(snapshot);
      this.setState({ points: snapshot.data().Points, })
    });
  }

  signOut = async () => {
    Alert.alert(
      'Would you like to sign out?',
      '',
      [
        { text: 'Yes, I would like to sign out.', 
          onPress: async () => {
            try {
              firebase.auth().signOut();
            } catch (err) {
              console.log(err);
            }
          }
        },
        { text: 'Cancel', 
        },
      ],
      {cancelable: true},
    );
  }

  render() {
  
    if (this.state.fetched) {
      return (
        <SafeAreaView style={styles.container}>
          
          <ImageBackground source={require('../Images/Backgrounds/beach.jpg')} 
            imageStyle={{resizeMode: 'cover'}} 
            style={styles.backgroundImage} 
          >
            <FlatList
              style ={{top: 150, width: (Dimensions.get('window').width), height: (Dimensions.get('window').height/4),}}
              numColumns={3}
              data = {DATA}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => {this.props.navigation.navigate(item.next)}} 
                >
                  <Image style = {{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/3}}resizeMode={'contain'} source={item.img} />
                </TouchableOpacity>
              )}keyExtractor={item => item.next}
            />
          
            <TouchableOpacity 
              styles={styles.forefront}
              onPress={ async () => this.signOut()}
            >
              <Image style={styles.avatar} resizeMode={'contain'} source={require('../Images/avatar-basic.png')} />
              <Text style = {styles.username}> {this.state.username}</Text>
              <Text style = {styles.points}>{this.state.points}<Image source={require('../Images/gem.png')} style={styles.gem} resizeMode={'contain'} /></Text>
            </TouchableOpacity>

            <FlatList
              style ={{width: (Dimensions.get('window').width), height: (Dimensions.get('window').height/4),}}
              numColumns={2}
              data = {DATA2}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => {this.props.navigation.navigate(item.next)}} 
                >
                  <Image style = {{width: Dimensions.get('window').width/2, height: Dimensions.get('window').width/3}}resizeMode={'contain'} source={item.img} />
                </TouchableOpacity>
              )}keyExtractor={item => item.next}
            />

          </ImageBackground>
          
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  gem: {
    width: 11,
    height: 17,
    backgroundColor: 'transparent',
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
    height: (Dimensions.get('window').height) / 2,
    width: (Dimensions.get('window').width),
  },

  avatar: {
    height: (Dimensions.get('window').height) / 3.5,
    width: (Dimensions.get('window').width) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  username: {
    fontSize: 20, 
    textAlign: 'center', 
    fontWeight: '600',
    backgroundColor: 'transparent',
  },

  points: {
    fontSize: 18,
    fontWeight: '400', 
    textAlign: 'center', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  button: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#2EC623',
    borderWidth: 2,
  },

  text: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2EC623',
    fontFamily: 'Georgia',
    fontSize: 24,
  },

});