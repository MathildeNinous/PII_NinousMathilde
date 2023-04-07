import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';


const MiniJeuScreen = () => {
    const [showGame, setShowGame] = useState(false);

    const handleStartGame = () => {
        setShowGame(true);
    };

    return (
        <View style={styles.container}>
            <Text>TEST</Text>
            {/* {showGame ? (
                <App />
            ) : (
                <>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Jeu du memory</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Jouez" onPress={handleStartGame} />
                    </View>
                </>
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '80%',
    },
});

export default MiniJeuScreen;
