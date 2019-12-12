import React from 'react'
import { StyleSheet, 
  View, 
  FlatList, 
  Text, 
  TouchableOpacity, 
  AsyncStorage,
  Image,
} from 'react-native'
import { material } from 'react-native-typography'


export default function Actions(props) {
  console.log('actions entered');
    return (
      <View style={styles.container}>
        
        {/*this is the feed of actions filled with individual items*/}
        <FlatList
          data={props.feed}
          renderItem={({ item }) => (
            /*this is how individual items are structured*/ 
            <TouchableOpacity 
              style={styles.action}
              onPress={() => { props.navigation.navigate('ActionItem', {picURL: item.Pic, description: item.Description, gems: item.Gems, title: item.Title,} ) }} 
            >

            {/* FORMAT IN ACCORDANCE WITH STRUCTURE OF DATA IN FIREBASE */}
              <Image source={{uri: item.Pic}} style={{width: '100%', height: 200,}} resizeMode={'contain'} />
              <Text style={{color:'#1B9A22', fontSize: 20}}>{item.Title}</Text>
              <Text style={material.subheading}>{item.Gems}<Image source={require('../Images/gem.png')} style={{height: 15, width: 15,}} resizeMode={'contain'} /></Text>
            </TouchableOpacity>
          )}
          /* GIVE AN APPROPRIATE EXTRACTOR */
          keyExtractor={item => item.Title}
        />

      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  action: {
    margin: 5,
    padding: 5,
    borderColor: 'gray',
    borderRadius: 2.5,
    borderWidth: .5,
  },

});
