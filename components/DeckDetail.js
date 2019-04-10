import React, { Component } from 'react';
import { Alert, Text, View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux'
import Colors from '../constants/Colors';
import SubmitBtn from './SubmitBtn'

class DeckDetail extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `DECK : ${navigation.state.params.title}`,
    })

    _deleteButton = () => {
        const { navigation } = this.props
        const title = navigation.state.params.title
        Alert.alert(`Delete Deck : ${title}?`,
            'It deletes in storage for ever.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete', style: 'destructive',
                    onPress: () => this._deleteDeck()
                }
            ]
        );
    }

    _deleteDeck = () => {
        const { navigation } = this.props

        navigation.navigate(
            'Tabs'
        )
    }

    _displayNextQuote() {
        let { index, quotes } = this.state;
        let nextIndex = index + 1;
        if (nextIndex === quotes.length) nextIndex = 0;
        this.setState({ index: nextIndex })
    }

    render() {
        const { navigation, decks } = this.props
        const title = navigation.state.params.title

        const number = decks[title].questions.length

        navigation.navigationOptions = {
            headerTitle: title,
        }

        let text = number > 1 ? 'cards' : 'card'

        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={{ fontSize: 20 }}>{title}</Text>
                    <Text >has {number} {text}</Text>
                </View>
                <View style={styles.center}>
                    <SubmitBtn
                        title='ADD CARD'
                        addStyle={{ backgroundColor: Colors.gray }}
                        onPress={() => {
                            navigation.navigate(
                                'AddCard',
                                { title: title, numberOfCards: number }
                            )
                        }} />
                    <View style={{ height: 20 }} />
                    {number > 0
                        ? (
                            <SubmitBtn
                                title='QUIZ'
                                addStyle={{ backgroundColor: Colors.purple }}
                                onPress={() => {
                                    navigation.navigate(
                                        'Quiz',
                                        { title: title, numberOfCards: number }
                                    )
                                }} />
                        )
                        : (
                            <View></View>
                        )}

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    deleteButton: {
        backgroundColor: Colors.white,
        borderColor: Colors.red,
        color: Colors.red,
        margin: 10,
        borderRadius: 7,
    },

});

function mapStateToProps(data) {
    return {
        decks: data["decks"],
        questions: data["questions"],
    }
}

export default connect(mapStateToProps)(DeckDetail)