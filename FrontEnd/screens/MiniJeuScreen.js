import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const image = require("../assets/comingSoon.jpg");

const MiniJeuScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fonctionnalité à venir ...</Text>
            <Image
                source={image}
                style={styles.sectionImage}
                accessible={true}
                accessibilityLabel="ComingSoon"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionImage: {
        width: 400,
        height: 400,
        marginRight: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    }
});

export default MiniJeuScreen;
