import React from 'react';
import useEffect from 'react';
import { StyleSheet, 
    Text, 
    View, 
    Image, 
    Dimensions, 
    TouchableOpacity, 
    ActivityIndicator,
    AsyncStorage,
    ScrollView,
    FlatList,
} from 'react-native';
import { material } from 'react-native-typography'



import firebase from 'firebase';
import { firestore, 
    storage,
} from '../../firebase';

//Third Party Components
import { FontAwesome } from '@expo/vector-icons'; 

export default function ActionItem(props) {

    claimPoints = async() => {
        try {
            const docref = firestore.doc('UsersCollection/' + firebase.auth().currentUser.uid); 
            let doc = await docref.get();
            if (doc.exists) {
              let currPoints = doc.get('Points');
              let updatedPoints = currPoints + props.navigation.getParam('gems');
              console.log(updatedPoints);
              await docref.set({'Points': updatedPoints}, {merge: true});
            }
        } catch(err) {
            console.log(err);
        }
        props.navigation.navigate('Action');
    }

    console.log('action item screen');
    return (
        <View style={styles.container}>
            <ScrollView 
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.scrollContainer}>
                    <Image source={{uri: props.navigation.getParam('picURL')}} style={styles.image} resizeMode={'contain'} />
                    <Text style={{color:'#1B9A22', fontSize: 20}}>{props.navigation.getParam('title')}</Text>
                    <Text style={material.subheading}>{props.navigation.getParam('description')}</Text>
                    <TouchableOpacity 
                        style={styles.pointButton}
                        onPress={ () => { this.claimPoints() }}
                    >
                        <Text style={{color: 'white'}}>Claim Gems</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}



const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        width: Dimensions.get('screen').width,
    },

    contentContainer: {
        flexGrow: 1,
        margin: 2,
        width: Dimensions.get('window').width - 6,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },

    scrollContainer: {
        alignItems: 'center',
        width: '95%',
        borderRadius: 10,
    },

    image: {
        width: Dimensions.get('window').width - 12, 
        height: Dimensions.get('window').width - 60,
        borderBottomEndRadius: 10,
    },
  
    activityIndicator: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    pointButton: {
        alignItems: 'center', 
        justifyContent: 'center', 
        height: Dimensions.get('window').height / 17, 
        width: Dimensions.get('window').width / 4,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#2EC623',
        backgroundColor: '#2EC623',
        margin: 5,
    },

  });