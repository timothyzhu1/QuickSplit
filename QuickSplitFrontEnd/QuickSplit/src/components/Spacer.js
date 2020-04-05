import React from 'react';
import {View, StyleSheet} from 'react-native';

const Spacer = ({children}) => {
    return (
        <View style={styles.spacer}>{children}</View>
    );
};

const styles = StyleSheet.create({
    spacer: {
        marginVertical: 5
    }

});

export default Spacer;
