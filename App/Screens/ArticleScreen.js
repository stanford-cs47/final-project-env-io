import React from 'react';
import useEffect from 'react';
import { StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    Image, 
    Dimensions,
    TextInput, 
    TouchableOpacity, 
    ActivityIndicator,
    AsyncStorage,
    ScrollView
} from 'react-native';
import { WebView } from 'react-native-webview'



import firebase from 'firebase';
import { firestore, 
    storage,
} from '../../firebase';

//Third Party Components
import { FontAwesome } from '@expo/vector-icons'; 

export default function ArticleScreen(props) {

    claimPoints = async() => {
        try {
            console.log('here');
            const docref = firestore.doc('UsersCollection/' + firebase.auth().currentUser.uid); 
            let doc = await docref.get();
            if (doc.exists) {
              let currPoints = doc.get('Points');
              let updatedPoints = currPoints + 10;
              console.log(updatedPoints);
              await docref.set({'Points': updatedPoints}, {merge: true});
            }
        } catch(err) {
            console.log(err);
        }
        props.navigation.navigate('News');
    }

    loadindicator = () => {
        return (
            <View>
                <ActivityIndicator style={styles.activityIndicator} size='large' color='black'/>
            </View>
        )
    }

    return (

        <ScrollView 
            style={{flex: 1}}
            contentContainerStyle={styles.contentContainer}
        >
            
            <View style={styles.container}> 

                <WebView source={{ uri: props.navigation.getParam('url') }} 
                    startInLoadingState={true}
                    style={styles.container}
                    renderLoading={() => {
                        return this.loadindicator();
                    }}
                />
                {/* SET CLAIMED ARTICLES IF YOU HAVE TIME */}
            </View> 

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.pointButton}
                    onPress={() => { this.claimPoints() }}
                >
                    <Text style={{color: 'white'}}>Share for 10 Gems</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.pointButton}
                    onPress={ () => { this.claimPoints() }}
                >
                    <Text style={{color: 'white'}}>Claim 10 Gems</Text>
                </TouchableOpacity>
            </View>
            

        </ScrollView>
    );
}



const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('screen').height - 40,
        width: Dimensions.get('window').width - 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'flex-start',
        borderRadius: 10,
    },

    contentContainer: {
        flexGrow: 1,
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 2,
        margin: 2,
    },
  
    activityIndicator: {
        position: 'relative',
        bottom: 450,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonContainer: {
        alignItems: 'center', 
        backgroundColor: '#fff', 
        flexDirection: 'row', 
        justifyContent: 'center',
        borderRadius: 10,
    },
  
    pointButton: {
        alignItems: 'center', 
        justifyContent: 'center', 
        height: Dimensions.get('window').height / 17, 
        width: Dimensions.get('window').width / 3,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#2EC623',
        backgroundColor: '#2EC623',
        margin: 5,
    },

  });