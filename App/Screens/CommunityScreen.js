// put action screen stuff here

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
  ImageBackground,
} from 'react-native';

import { withNavigation, } from 'react-navigation';
import Community from '../Components/Community.js';

class CommunityScreen extends React.Component {
    state = {
        loading: true,
        friends: [],
    }
/*
    componentDidMount() {
        this.loadFriends();
    }
    async loadFriends() {
        this.setState({friends:[], loading: true});
        var currentFriends = [];
        //currentFriends = ask firebase for friends
        this.setState({friends : currentFriends})
    }
*/

    render() {
        const {articles, loading} = this.state;
    
        return (
            <SafeAreaView style={StyleSheet.container}>
                <ImageBackground source={require('../Images/Backgrounds/community.jpg')}
                    imageStyle={{resizeMode: 'stretch'}} 
                    style={styles.backgroundImage}
                >

                    <Community/>

                </ImageBackground>
                
            </SafeAreaView>
        );
    }
}

export default withNavigation(CommunityScreen);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },

    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
        height: (Dimensions.get('window').height),
        width: (Dimensions.get('window').width),
    },

});