import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import Colors from '../constants/Colors';
import SubmitBtn from '../components/SubmitBtn'

class DeckDetail extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
    })

    render() {
        const { navigation } = this.props
        const title = navigation.state.params.title
        const number = navigation.state.params.numberOfCards
        navigation.navigationOptions = {
            headerTitle: title,
        }

        let text = number > 1 ? 'cards' : 'card'

        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={{ fontSize: 20 }}>{title}</Text>
                    <Text >{number} {text}</Text>
                </View>
                <View style={styles.center}>
                    <SubmitBtn
                        title='ADD CARD'
                        onPress={() => {
                            navigation.navigate(
                                'AddCard',
                                { title: title, numberOfCards: number }
                            )
                        }} />
                    <View style={{ height: 20 }} />
                    <SubmitBtn
                        title='QUIZ'
                        onPress={() => {
                            navigation.navigate(
                                'Quiz',
                                { title: title, numberOfCards: number }
                            )
                        }} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.tintColor
    },
    item: {
        backgroundColor: Colors.white,
        borderRadius: Platform.OS === 'ios' ? 16 : 8,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    }

});

function mapStateToProps(data) {
    return {
        decks: data["decks"],
        questions: data["questions"],
    }
}

export default connect(mapStateToProps)(DeckDetail)