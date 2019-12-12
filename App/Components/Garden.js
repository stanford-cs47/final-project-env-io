

//This component was not implemented - would be useful for more robust functionality

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

import { List, ListItem, } from 'react-native-elements'

{/* view documentation for : extradata - auto rerender for state change */}

const DATA = [
    {
        plant : require('../Images/Crops/seeds.png')
    },
    {
        plant : require('../Images/Crops/strawberry-bush.png')
    },
    {
        plant : require('../Images/Crops/bush.png')
    },
    {
        plant : require('../Images/Crops/seeds.png')
    },
    {
        plant : require('../Images/Crops/bush.png')
    },
]

export default class Garden extends React.Component {
    
    state = {
        loading: true,
        plants : [],
        toWater : [],
        fullyGrown : [],
    }
    
    render() {
        const {loading} = this.state;
        
        return (
            <View style={styles.container}>
            
            {/* be sure to examine ListEmptyComponent, ListHeaderComponent (water droplets), columnWrapperStyle*/}
                <FlatList
                    data={DATA}
                    numColumns={3}
                    inverted={true}
                    style={styles.plantGrid}
                    renderItem={({ item }) => (
                
                    /*this is how individual items are structured*/ 
                    <TouchableOpacity 
                        style={styles.plant}
                        /*onPress={() => { water or harvest }}*/
                    >
                        <Image source={item.plant} style={styles.plantPic} resizeMode={'contain'}/>
                    </TouchableOpacity>
                    )}
                    keyExtractor={item => item.plant}
                />
                
            </View>
        );
   }
}
        
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        //height: (Dimensions.get('window').height) / 3,
        width: (Dimensions.get('window').width),
    },

    plantGrid: {
        height: (Dimensions.get('window').height),
        width: (Dimensions.get('window').width),
        alignContent: 'center',
        marginBottom: '10%',
    },
            
    plant: {
        height: (Dimensions.get('window').width) / 10,
        width: (Dimensions.get('window').width) / 10,
        marginLeft: (Dimensions.get('window').width - ( ((Dimensions.get('window').width) / 10) * 3)) / 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
            
    plantPic: {
        height: (Dimensions.get('window').width) / 10,
        width: (Dimensions.get('window').width) / 10,
    },
});
        