import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import Colors from '../constants/Colors';
import { handleInitialDataStorage, handleInitialData } from '../actions/shared'


class Decks extends Component {

    state = {
        ready: false,
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'DECKS',
    })

    _renderItem = ({ item }) => {
        const { title, questions } = item
        const { navigation } = this.props

        let number = questions.length
        let text = number > 1 ? 'cards' : 'card'
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate(
                    'DeckDetail',
                    { title: title, numberOfCards: number }
                )}>
                <View key={title} style={styles.item}>
                    <Text style={{ fontSize: 20 }}>{title}</Text>
                    <Text >{number} {text}</Text>
                </View>
            </TouchableOpacity>
        );

    }

    componentDidMount() {

        const { dispatch } = this.props

        //dispatch(handleInitialData()).then(() => this.setState(() => ({ ready: true })))
        //dispatch(handleInitialDataStorage()).then(() => this.setState(() => ({ ready: true })))
        /**
         * Great start : Review recomendation.
         * You can possibly have a set of initial decks and questions 
         * which will allow the user to get started with the app straight away. 
         * You can also consider adding splash screen to improve user experience.
         */
        dispatch(handleInitialData())   // 
            .then(() => dispatch(handleInitialDataStorage())
                .then(() => this.setState(() => ({ ready: true }))))
    }

    render() {

        const { decks } = this.props
        const { ready } = this.state

        const deckList = Object.keys(decks).map(id => (
            { title: id, questions: decks[id].questions }
        ));

        const numberOfDecks = deckList.length

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <View style={styles.container}>
                {numberOfDecks === 0
                    ? (
                        <View style={[styles.item, { backgroundColor: Colors.red }]}>
                            <Text style={{ fontSize: 20, color: Colors.white }}>No DECKS found in DB</Text>
                        </View>
                    )
                    : (
                        <FlatList
                            data={deckList}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.tintColor,
    },
    card: {
        margin: 10,
        flexDirection: 'row',
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
});

function mapStateToProps(data) {
    return {
        decks: data["decks"],
        questions: data["questions"],
    }
}

export default connect(mapStateToProps)(Decks)