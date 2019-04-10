import React from 'react';
import {
    createBottomTabNavigator,
    createAppContainer,
    createMaterialTopTabNavigator,
    createStackNavigator,
} from 'react-navigation';
import { Platform } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';


import Decks from '../components/Decks';
import NewDeck from '../components/NewDeck';
import DeckDetail from '../components/DeckDetail';
import AddCard from '../components/AddCard';
import Quiz from '../components/Quiz';
import Colors from '../constants/Colors';

const router = {
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) =>
                Platform.OS === 'ios' && <Ionicons name="ios-bookmarks" size={30} color={tintColor} />,
        },
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({ tintColor }) =>
                Platform.OS === 'ios' && <FontAwesome name="plus-square" size={30} color={tintColor} />,
        },
    }
};

const navigationOptions = {
    tabBarOptions: {
        showIcon: true,
        activeTintColor: Platform.OS === 'ios' ? Colors.tintColor : Colors.white,
        style: {
            padding: 10,
            height: Platform.OS === 'ios' ? 60 : 'auto',
            fontSize: 18,
            backgroundColor: Platform.OS === 'ios' ? Colors.white : Colors.tintColor,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowRadius: 6,
            shadowOpacity: 1,
        },
    },
};

const TabNav =
    Platform.OS === 'ios'
        ? createBottomTabNavigator(router, navigationOptions)
        : createMaterialTopTabNavigator(router, navigationOptions);


const MainNavigator = createAppContainer(createStackNavigator({
    Home: {
        screen: TabNav,
        navigationOptions: {
            header: null,
        },
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: Colors.white,
            headerStyle: {
                backgroundColor: Colors.tintColor,
            },
        }),
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: Colors.white,
            headerStyle: {
                backgroundColor: Colors.tintColor,
            },
        }),
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: Colors.white,
            headerStyle: {
                backgroundColor: Colors.tintColor,
            },
        }),
    },
}));

export default MainNavigator
