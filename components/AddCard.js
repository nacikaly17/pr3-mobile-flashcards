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
import { addQuestion } from '../actions/questions'
import { formatQuestion, generateUID } from '../utils/helpers'

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

        dispatch(addQuestion({
            [id]: card
        }))


        this.setState(() => ({
            question: null,
            answer: null
        }))

        // Save to 'DB'


    }


    render() {
        const { navigation } = this.props
        const title = navigation.state.params.title
        const number = navigation.state.params.numberOfCards

        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20 }}>{title} ( {number}  cards )</Text>
                <View style={{ height: 20 }} />
                <TextInput
                    style={[styles.input, { height: 100 }]}
                    placeholder="Question"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    onChangeText={text => this.setState({ question: text })}
                />
                <TextInput
                    style={[styles.input, { height: 200 }]}
                    placeholder="Answer"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    onChangeText={text => this.setState({ answer: text })}
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

export default connect(mapStateToProps)(AddCard)