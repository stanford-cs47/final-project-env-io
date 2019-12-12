import React from 'react'
import { StyleSheet, 
  View, 
  FlatList, 
  Text, 
  TouchableOpacity, 
  AsyncStorage,
  Image
} from 'react-native'
import { material } from 'react-native-typography'


export default function News(props) {

    return (
      <View style={styles.container}>
        
        {/*this is the feed of news articles filled with individual items*/}
        <FlatList
          data={props.feed}
          renderItem={({ item }) => (
            
            /*this is how individual items are structured*/ 
            <TouchableOpacity 
              style={styles.article}
              onPress={() => { props.navigation.navigate('Article', {url: item.url}) }} 
            >
              <Text style={{color:'#1B9A22', fontSize: 20}}>{item.title}</Text>
              <Text style={material.subheading}>{item.snippet}</Text>
              <Text style={material.body2}>{item.byline}</Text>

              <Text style ={material.body2}> Read to the bottom of the page for +10 <Image
            style = {{width: 10, height: 20}}source={require('../Images/gem.png')}
          />
        </Text>  
              
            </TouchableOpacity>
          )
        }
          keyExtractor={item => item.url}
        />

      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 20,
  },

  article: {
    margin: 5,
    padding: 5,
    borderColor: 'gray',
    borderRadius: 2.5,
    borderWidth: .5,
  },

});
