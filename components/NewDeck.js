import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
} from 'react-native';
import { connect } from 'react-redux'
import Colors from '../constants/Colors';
import SubmitBtn from '../components/SubmitBtn'
import { addDeck } from '../actions/decks'
import { formatDeck } from '../utils/helpers'

class NewDeck extends Component {

    state = {
        deckTitle: null
    };

    static navigationOptions = ({ navigation }) => ({
        title: 'NEW DECK',
    })

    _submit = () => {

        const title = this.state.deckTitle

        const { navigation } = this.props


        //alert('Submit button clicked!');

        // Update Redux
        const { dispatch } = this.props
        dispatch(addDeck({
            [title]: formatDeck(title)
        }))


        this.setState(() => ({
            deckTitle: '',
        }))
        // Navigate to AddCard
        navigation.navigate(
            'AddCard',
            { title: title, numberOfCards: 0 }
        )
        // Save to 'DB'


    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20 }}>What is the title of your new deck?</Text>
                <View style={{ height: 20 }} />
                <TextInput
                    style={styles.input}
                    placeholder="Deck Title"
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setState({ deckTitle: text })}
                />
                <View style={styles.center}>
                    <View style={{ height: 20 }} />
                    <SubmitBtn
                        title='Submit'
                        onPress={this._submit}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.tintColor,
        borderRadius: 4,
        width: '80%',
        marginBottom: 20,
        fontSize: 20,
        padding: 10,
        height: 50,
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

export default connect(mapStateToProps)(NewDeck)