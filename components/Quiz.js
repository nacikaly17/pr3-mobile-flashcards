import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { connect } from 'react-redux'
import Colors from '../constants/Colors';
import SubmitBtn from './SubmitBtn'
import StyledButton from './StyledButton'
import { setLocalNotification, clearLocalNotification } from '../utils/notifications'


class Quiz extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `QUIZ`,
    })

    state = {
        index: 0,
        showAnswer: false,
        correctAnswer: 0,
        quizCompleted: false,
    };

    _restartQuiz = () => {

        this.setState({
            index: 0,
            showAnswer: false,
            correctAnswer: 0,
            quizCompleted: false,
        })
    }

    _nextQuestion = (answer) => {
        const { navigation, decks } = this.props
        const title = navigation.state.params.title
        const numberOfCards = decks[title].questions.length

        const { index, correctAnswer } = this.state;
        let quizCompleted = false;
        let nextIndex = index + 1;
        if (nextIndex === numberOfCards) {
            nextIndex = index;
            quizCompleted = true;

            // Update  Notification
            clearLocalNotification()
                .then(setLocalNotification)

        }
        this.setState({
            index: nextIndex,
            showAnswer: false,
            correctAnswer: correctAnswer + answer,
            quizCompleted: quizCompleted,
        })
    }
    render() {

        const { navigation, decks, questions } = this.props
        const title = navigation.state.params.title

        const numberOfCards = decks[title].questions.length


        const { index, showAnswer, quizCompleted, correctAnswer } = this.state

        const questionId = decks[title].questions[index]
        const question = questions[questionId].question
        const answer = questions[questionId].answer
        let counter = index + 1

        let resultText = question
        if (quizCompleted) {
            let percentage = correctAnswer * 100 / numberOfCards
            resultText = `Quiz completed. \nNumber of correct answer :  ${correctAnswer} \nPercentage : ${percentage} %`
        }
        return (
            <View style={styles.container}>
                <Text style={styles.counterText}>{counter} / {numberOfCards}</Text>

                <View style={styles.buttons}>
                    <StyledButton
                        style={styles.questionButton}
                        visible={!quizCompleted}
                        color={Colors.blue}
                        title="Question"
                        onPress={() => this.setState({ showAnswer: false })}
                    />
                    <StyledButton
                        style={styles.answerButton}
                        visible={!quizCompleted}
                        color={Colors.red}
                        title="Answer"
                        onPress={() => this.setState({ showAnswer: true })}
                    />
                </View>
                {showAnswer === false
                    ? (
                        <TextInput
                            style={[styles.input, { height: 200, color: Colors.blue, }]}
                            value={resultText}
                            underlineColorAndroid="transparent"
                            multiline={true}
                            editable={false}
                        />)
                    : (
                        <TextInput
                            style={[styles.input, { height: 200, color: Colors.red, }]}
                            value={answer}
                            underlineColorAndroid="transparent"
                            multiline={true}
                            editable={false}
                        />)
                }


                {quizCompleted == true
                    ? (
                        <View>
                            <View style={styles.center}>
                                <SubmitBtn
                                    title='Restart Quiz'
                                    addStyle={{ backgroundColor: Colors.green }}
                                    onPress={this._restartQuiz} />
                                <View style={{ height: 20 }} />
                                <SubmitBtn
                                    title='Back to Deck'
                                    addStyle={{ backgroundColor: Colors.purple }}
                                    onPress={() => {
                                        navigation.navigate(
                                            'DeckDetail'
                                        )
                                    }} />
                            </View>
                        </View>
                    )
                    : (
                        <View style={styles.center}>
                            <SubmitBtn
                                title='Correct'
                                addStyle={{ backgroundColor: Colors.green }}
                                onPress={() => this._nextQuestion(1)} />
                            <View style={{ height: 20 }} />
                            <SubmitBtn
                                title='Incorrect'
                                addStyle={{ backgroundColor: Colors.red }}
                                onPress={() => this._nextQuestion(0)} />
                        </View>
                    )}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.white,
    },
    input: {
        borderWidth: 1,
        backgroundColor: Colors.white,
        borderColor: Colors.tintColor,
        borderRadius: 8,
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
    },
    buttons: {
        flexDirection: 'row',
    },
    questionButton: {
        backgroundColor: Colors.lightgray,
        borderColor: Colors.blue,
        color: Colors.red,
        margin: 10,
        borderRadius: 7,
    },
    answerButton: {
        backgroundColor: Colors.lightgray,
        borderColor: Colors.blue,
        margin: 10,
        borderRadius: 7,
    },
    counterText: {
        position: 'absolute',
        left: 10,
        top: 30,
    },

});

function mapStateToProps(data) {
    return {
        decks: data["decks"],
        questions: data["questions"],
    }
}

export default connect(mapStateToProps)(Quiz)