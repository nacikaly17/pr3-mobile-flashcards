import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Constants } from 'expo'
import middleware from './middleware'
import MainNavigator from './navigation/MainNavigator';
import Colors from './constants/Colors';
import { setLocalNotification } from './utils/notifications'

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {

  componentDidMount() {
    setLocalNotification()
  }


  render() {

    const store = createStore(reducer, middleware);

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppStatusBar backgroundColor={Colors.tintColor} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});