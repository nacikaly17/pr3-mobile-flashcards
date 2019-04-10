import React from 'react';
import { View, Button } from 'react-native';

export default function StyledButton(props) {
    let button = null;
    if (props.visible)
        button = (
            <View style={props.style}>
                <Button
                    title={props.title}
                    color={props.color}
                    onPress={props.onPress}
                />
            </View>
        );

    return button;
}