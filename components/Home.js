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
import { handleInitialData } from '../actions/shared'
import Colors from '../constants/Colors';

class Home extends Component {

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
                //onPress={() => console.log('Pressed!')}>
                onPress={() => navigation.navigate(
                    'DeckDetail',
                    { title: title, numberOfCards: number }
                )}>
                <View key={title} style={styles.item}>
                    <Text style={{ fontSize: 20 }}>{title}</Text>
                    <Text >{number} {text}</Text>
                </View>
            </TouchableOpacity>
        )

    }

    componentDidMount() {

        const { dispatch } = this.props
        dispatch(handleInitialData())
            .then(() => this.setState(() => ({ ready: true })))

    }

    render() {

        const { decks } = this.props
        const { ready } = this.state

        const deckList = Object.keys(decks).map(id => (
            { title: id, questions: decks[id].questions }
        ));

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={deckList}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
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

export default connect(mapStateToProps)(Home)