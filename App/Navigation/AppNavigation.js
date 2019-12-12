import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import React from 'react';
import { AsyncStorage, } from 'react-native';
import { Entypo, 
    Ionicons, 
    MaterialCommunityIcons, 
    AntDesign,
} from '@expo/vector-icons';
import Metrics from '../Themes/Metrics'

//import all necessary screens here
import NewsScreen from '../Screens/NewsScreen'
import ActionScreen from '../Screens/ActionScreen'
import CommunityScreen from '../Screens/CommunityScreen'
import ArticleScreen from '../Screens/ArticleScreen'
import ActionItemScreen from '../Screens/ActionItemScreen'
import GardenScreen from '../Screens/GardenScreen'
import AvatarScreen from '../Screens/AvatarScreen'
import TatertotScreen from '../Screens/TatertotScreen'
import F_bigoilScreen from '../Screens/F_bigoilScreen'
import Flowerbr0Screen from '../Screens/Flowerbr0Screen'

const NewsStack = createStackNavigator({
    News: {screen: NewsScreen},
    Article: {screen: ArticleScreen}
},
{
    headerMode: 'float',
    initialRouteName: 'News',
})

NewsStack.navigationOptions = ({ navigation }) => {
    return {
        tabBarLabel: 'News',
            tabBarIcon: ({ tintColor }) => (
                <Entypo name="news"
                    size={Metrics.icons.medium}
                    color={tintColor} 
                />
            ),
    };
};

const ActionStack = createStackNavigator({
    Action: {screen: ActionScreen},
    ActionItem: {screen: ActionItemScreen}
},
{
    headerMode: 'float',
    initialRouteName: 'Action',
})

ActionStack.navigationOptions = ({ navigation }) => {
    return {
        tabBarLabel: 'Action',
            tabBarIcon: ({ tintColor }) => (
                <Entypo name='flash'
                    size={Metrics.icons.medium}
                    color={tintColor} 
                />
            ),
    };
};

const CommunityStack = createStackNavigator({
    Community: {screen: CommunityScreen},
    Tatertot: {screen: TatertotScreen},
    F_bigoil: {screen: F_bigoilScreen},
    Flowerbr0: {screen: Flowerbr0Screen},
},
{
    headerMode: 'float',
    initialRouteName: 'Community',
})

CommunityStack.navigationOptions = ({ navigation }) => {
    return {
        tabBarLabel: 'Community',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name='ios-people'
                    size={Metrics.icons.medium}
                    color={tintColor} 
                />
            ),
    };
};

const GardenStack = createStackNavigator({
    Garden: {screen: GardenScreen},
},
{
    headerMode: 'float',
    initialRouteName: 'Garden',
})

GardenStack.navigationOptions = ({ navigation }) => {
    return {
        tabBarLabel: 'Garden',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name='flower'
                    size={Metrics.icons.medium}
                    color={tintColor} 
                />
            ),
    };
};

const AvatarStack = createStackNavigator({
    Avatar: {screen: AvatarScreen},
},
{
    headerMode: 'float',
    initialRouteName: 'Avatar',
})

AvatarStack.navigationOptions = ({ navigation }) => {
    return {
        tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <AntDesign name='home'
                    size={Metrics.icons.medium}
                    color={tintColor} 
                />
            ),
    };
};

//HEADER
const Header = (navigation) => {
    return {
        header: props => <Header {...props} />,
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#000',
    };
}

//BOTTOM TABS
const TabNav = createBottomTabNavigator({
    AvatarScreen: { screen: AvatarStack },
    NewsScreen: { screen: NewsStack },
    ActionScreen: { screen: ActionStack },
    GardenScreen: { screen: GardenStack },
    CommunityScreen: { screen: CommunityStack },

},  {
    // Default config for all screens
    initialRouteName: 'AvatarScreen',
    tabBarOptions: {
      activeTintColor: '#2EC623',
      showLabel: true,
      tabStyle: {
          paddingTop: 4,
      }
    },
})


const AppContainer = createAppContainer(TabNav);

export default AppContainer