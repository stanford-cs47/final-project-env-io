//CONFIGURE THIS TO WORK WITH NEWSAPI.ORG API - just using nyt rn

import AppConfig from './AppConfig'
const queryString = require('query-string'); //Importing JavaScript library from npm

//NOTE: you can mess around with what is returned here to return whatever you want
const APIRequest = {
  requestSearchPosts: async (searchTerm) => {
    try {
      let parameters = {'api-key': AppConfig.apiKey};
      if (searchTerm) {
        parameters.q = searchTerm
      }
      parameters = queryString.stringify(parameters);
      console.log('Searching using parameters: ' + parameters);
      console.log('Searching for term: ' + searchTerm);

      let response = await fetch(AppConfig.articleSearch + '?' + parameters);
      let responseJson = await response.json();
      let articles = responseJson.response.docs;
      var result = [];
      for(var i = 0; i < articles.length; i++) {
        if(!articles[i].byline) continue;
        var newsObject = {
          title: articles[i].headline.main,
          snippet: articles[i].snippet,
          byline: articles[i].byline.original,
          date: articles[i].pub_date,
          url: articles[i].web_url
          //media: articles[i].mulitmedia
          //add content
          //add image
        }
        result.push(newsObject);
      }

      return result;
    } catch (error) {
      console.error(error);
    }
  },

  requestCategoryPosts: async(category) => {
    try {
      let parameters = {'api-key': AppConfig.apiKey};
      parameters = queryString.stringify(parameters);
      console.log('Searching using parameters: ' + parameters);

      let response = await fetch(AppConfig.topStories + category + '.json?' + parameters);
      let responseJson = await response.json();
      let articles = responseJson.results;
      var result = [];
      for(var i = 0; i < articles.length; i++) {
        if(!articles[i].byline) continue;
        var newsObject = {
          title: articles[i].title,
          snippet: articles[i].abstract,
          byline: articles[i].byline,
          date: articles[i].published_date,
          url: articles[i].url
        }
        result.push(newsObject);
      }
      return result;
    } catch (error) {
      console.error(error);
    }
  },
}

export default APIRequest;