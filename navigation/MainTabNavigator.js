import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Home from '../components/Home';
import NewDeck from '../components/NewDeck';
import DeckDetail from '../components/DeckDetail';
import AddCard from '../components/AddCard';
import Quiz from '../components/Quiz';
import Colors from '../constants/Colors';


const HomeStack = createStackNavigator({
    Tab1: Home,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        />
    ),
};

const NewDeckStack = createStackNavigator({
    Tab2: NewDeck,
});

NewDeckStack.navigationOptions = {
    tabBarLabel: 'NEW DECK',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
        />
    ),
};

const BottomTabNavigator = createBottomTabNavigator({
    HomeStack,
    NewDeckStack,
});

const MainNavigator = createStackNavigator({
    Tabs: {
        screen: BottomTabNavigator,
        navigationOptions: {
            headerTintColor: Colors.white,
            headerStyle: {
                backgroundColor: Colors.tintColor
            }
        }
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            headerTintColor: Colors.white,
            headerStyle: {
                backgroundColor: Colors.tintColor
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: Colors.white,
            headerStyle: {
                backgroundColor: Colors.tintColor
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: Colors.white,
            headerStyle: {
                backgroundColor: Colors.tintColor
            }
        }
    }
});



export default MainNavigator