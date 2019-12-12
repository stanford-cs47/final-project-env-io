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
} from 'react-native';

export default function Plant(props) {

    /*
    nextState = () => {
        if (this.state.seed) {
            this.setState({seed: false, grown: true,})
        } else if (this.state.grown) {
            this.setState({grown: false, harvested: true})
        }
    }
    */

        return(
            <TouchableOpacity 
                style={styles.plant}
                onPress={() => { this.nextState() }}
            >
                {/* source - firestore.plantstate*/}
                <Image source={item.plant} style={styles.plantPic} resizeMode={'contain'}/>
            </TouchableOpacity>
        );
    }


        
const styles = StyleSheet.create({
    
    container: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        //height: (Dimensions.get('window').height) / 3,
        width: (Dimensions.get('window').width / 3),
    },
            
});
        