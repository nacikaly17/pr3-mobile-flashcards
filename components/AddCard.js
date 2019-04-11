import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
} from 'react-native';
import { connect } from 'react-redux'
import Colors from '../constants/Colors';
import SubmitBtn from './SubmitBtn'
import { addQuestion } from '../actions/questions'
import { formatQuestion, generateUID } from '../utils/helpers'
import { saveCard } from '../utils/api'

class AddCard extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `ADD CARD`,
    })

    state = {
        question: null,
        answer: null
    };

    _submit = () => {

        const { navigation, dispatch } = this.props

        const title = navigation.state.params.title
        const { question, answer } = this.state
        const id = generateUID()
        const card = formatQuestion({ id, title, question, answer })

        // alert(JSON.stringify(card));

        // Update Redux

        dispatch(addQuestion(title, id, { [id]: card }))


        this.setState(() => ({
            question: null,
            answer: null
        }))

        // Save to 'DB'
        saveCard({ id, card })

        navigation.navigate(
            'DeckDetail',
            { title: title, numberOfCards: 0 }
        )
    }

    _onChangeText = (qa, text) => {

        this.setState((state) => {
            return {
                ...state,
                [qa]: text,
            }
        })
    }

    render() {
        const { navigation, decks, questions } = this.props
        const title = navigation.state.params.title
        const number = decks[title].questions.length


        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20 }}>{title} ( {number}  cards )</Text>
                <View style={{ height: 20 }} />
                <TextInput
                    style={[styles.input, { height: 100 }]}
                    placeholder="Question"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    onChangeText={(text) => this._onChangeText("question", text)}
                />
                <TextInput
                    style={[styles.input, { height: 200 }]}
                    placeholder="Answer"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    onChangeText={(text) => this._onChangeText("answer", text)}
                />

                <View style={styles.center}>
                    <View style={{ height: 20 }} />
                    <SubmitBtn
                        title='Submit'
                        addStyle={{ backgroundColor: Colors.purple }}
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
        paddingTop: 20,
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

export default connect(mapStateToProps)(AddCard)