import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, 
  View, 
  Button, 
  TextInput, 
  TouchableOpacity, 
  AsyncStorage,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

//export default function instead of class because this is a functional component
export default function Search(props) {

      search = () => {
        props.loadFeed();
        this.searchbar.clear();
      }

    return (

      <View style={styles.searchRow}>

        <TextInput
          ref={(component) => {this.searchbar = component;}}
          style={styles.textinput}
          placeholder="Search for News here - courtesy NYT"
          onChangeText={text => props.onChangeText(text)}
          onSubmitEditing={this.search}
        />

        <TouchableOpacity 
          style={{alignItems: 'flex-end', justifyContent: 'center', width: '15%'}}
          onPress={props.loadFeed}
        >
          <FontAwesome
            style={{ paddingRight: 5, }}
            name='search'
            size={25}
            color='#2EC623'
          />
        </TouchableOpacity>

      </View>

    );

}

const styles = StyleSheet.create({
	searchRow: {
    	flexDirection: 'row',
    	justifyContent: 'flex-start',
   		alignItems: 'center',
    	width: '92%',
    	borderRadius: 10,
      backgroundColor: '#F0EEEE',
      marginTop: 15,
  	},

  	textinput: {
   		height: 40,
    	width: '85%',
      paddingLeft: 10,
    	textAlign: 'left',
  	},
});
