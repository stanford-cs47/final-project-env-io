import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { StyleSheet, 
    SafeAreaView, 
    View, FlatList, 
    Text, 
    Linking, 
    TouchableOpacity,
    AsyncStorage,
    Button,
    Alert,
    Dimensions,
    Image,
    ImageBackground,
} from 'react-native'
import { material } from 'react-native-typography'

import { List, ListItem, } from 'react-native-elements'

import { withNavigation } from 'react-navigation'


const AVATAR_DATA = [
    {
        avatar : require('../Images/tatertot29_with_name.png'),
        infoScreen : 'Tatertot'
    },
    {
        avatar : require('../Images/f_bigoil_with_name.png'),
        infoScreen : 'F_bigoil'
    },
    {
        avatar : require('../Images/flowerbr0_with_name.png'),
        infoScreen : 'Flowerbr0'
    }
]

const BUTTON_DATA = [
    {
        text : 'Local'
    },
    {
        text : 'Regional'
    },
    {
        text : 'Global'
    }
]

class Community extends React.Component {

    state = {
        loading: true,
    }

    render() {
        const{loading} = this.state;

        return (
            <View style={styles.container}>
                
                <FlatList
                    data={BUTTON_DATA}
                    //style={styles.buttonList}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                Alert.alert(
                                    'Filtering unavailable: not enough total users'
                                )
                            }}
                        >
                            <Text style={styles.buttonText} >{item.text}</Text>
                        </TouchableOpacity>
                    )} keyExtractor={item => item.text}
                />

                <FlatList
                    data={AVATAR_DATA}
                    numColumns={3}
                    style={styles.avatarList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                        style={styles.avatar}
                        onPress={() => { this.props.navigation.navigate(item.infoScreen)}}
                        >
                            <Image source={item.avatar} />
                        </TouchableOpacity>
                    )} keyExtractor={item => item.infoScreen}
                />
            </View>

        );
    }

} 



export default withNavigation(Community);

const styles = StyleSheet.create({
    container: {
        /*backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: (Dimensions.get('window').height),
        width: (Dimensions.get('window').width),*/
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        //alignContent: 'center',
        height: (Dimensions.get('window').height) * 2 / 3,
        width: (Dimensions.get('window').width),
    },

    avatarList: {
        flexDirection: 'row',
        alignContent: 'center',
        //alignItems: 'center',
        //justifyContent: 'space-around',
        //marginLeft: (Dimensions.get('window').width - ( ((Dimensions.get('window').width) / 10) * 3)) / 8,
        //marginRight: (Dimensions.get('window').width - ( ((Dimensions.get('window').width) / 10) * 3)) / 8,
        //height: (Dimensions.get('window').height),
        //width: (Dimensions.get('window').width),
        //marginBottom: '10%',
    },

    avatar: {
        //justifyContent: 'center',
        //alignItems: 'center',
        marginLeft: (Dimensions.get('window').width - ( ((Dimensions.get('window').width) / 10) * 3)) / 8,
        marginRight: (Dimensions.get('window').width - ( ((Dimensions.get('window').width) / 10) * 3)) / 8,
    },

    buttonList: {
        flexDirection: 'row',
        //justifyContent: 'center',
        alignContent: 'center',
        //alignItems: 'center',
        //height: (Dimensions.get('window').height),
        //width: (Dimensions.get('window').width),
    },

    button: {
        padding: 10,
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#2EC623',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: (Dimensions.get('window').width - ( ((Dimensions.get('window').width) / 10) * 3)) / 8,
        marginRight: (Dimensions.get('window').width - ( ((Dimensions.get('window').width) / 10) * 3)) / 8,
    },

    buttonText: {
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1,},
        textShadowRadius: 2,
    },
});