import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const QuizBtnAjoutPropositions = ({ navigation, route }) => {
    const { questions } = route.params;

    const handleQuestionPress = (question) => {
        navigation.navigate('QuizPropositionsForm', { question });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sélectionner une question :</Text>
            <Text style={styles.subtitle}>Etape 3/4</Text>
            {questions.map((question, index) => (
                <TouchableOpacity key={index} style={styles.button} onPress={() => handleQuestionPress(question)}>
                    <Text style={styles.buttonText}>{question}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    subtitle: {
        fontStyle: 'italic',
        fontSize: 35,
        color: 'white',
    },
});


export default QuizBtnAjoutPropositions;
