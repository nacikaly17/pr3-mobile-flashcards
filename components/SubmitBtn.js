import React from 'react';
import {
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';

import Colors from '../constants/Colors';

function SubmitBtn({ title, addStyle, onPress }) {

    const styleBasic =
        Platform.OS === 'ios'
            ? styles.iosSubmitBtn
            : styles.androidSubmitBtn

    return (
        <TouchableOpacity
            style={[styleBasic, addStyle]}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iosSubmitBtn: {
        backgroundColor: Colors.pruple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: '80%',
        marginLeft: 40,
        marginRight: 40,
    },
    androidSubmitBtn: {
        backgroundColor: Colors.pruple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        width: '80%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: Colors.white,
        fontSize: 22,
        textAlign: 'center'
    },
});


export default SubmitBtn