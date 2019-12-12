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
} from 'react-native';

//import { List, ListItem, } from 'react-native-elements'
import APIRequest from '../Config/APIRequest'

import News from '../Components/News'
import Search from '../Components/Search'

//Third Party Components
import { FontAwesome } from '@expo/vector-icons'; 

export default class NewsScreen extends React.Component {

  state = {
    loading: true,
    articles : [],
    searchText: '',
    category: ''
  }

  componentDidMount() {
    this.loadArticles();
  }

  onChangeText = text => {
      this.setState({searchText: text});
  }

  searchNews = () => {
    this.loadArticles(this.state.searchText);
  }

  articleRender = () => {
    if (this.state.loading) {  
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
         <ActivityIndicator style={styles.activityIndicator} size='large' color='black'/>
        </View>
      )
    }
    else {
      return (
        <View style={{flex: 1}}>
         <News feed={this.state.articles} navigation={this.props.navigation} />
        </View>
      )
    }
  }

  async loadArticles(searchTerm = 'climate', category = '') {
    this.setState({articles:[], loading: true});
    var resultArticles = [];
    if (category === '') {
      resultArticles = await APIRequest.requestSearchPosts(searchTerm);
    } 
    console.log(resultArticles);
    this.setState({loading: false, articles: resultArticles})
  }

  render() {
    const {articles, loading} = this.state;

    return (
      <SafeAreaView style={styles.container}>

        <Search
          onChangeText={text => this.onChangeText(text)}
          loadFeed={() => this.searchNews()}
        />

        {this.articleRender()}

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  logo: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    height: (Dimensions.get('window').width) / 5.1,
  },

  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },

});
