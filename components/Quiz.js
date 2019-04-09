import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { connect } from 'react-redux'
import Colors from '../constants/Colors';

class Quiz extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `QUIZ`,
    })

    render() {

        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20 }}>Quiz</Text>
                <View style={{ height: 20 }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 40
    },
});
export default connect()(Quiz)