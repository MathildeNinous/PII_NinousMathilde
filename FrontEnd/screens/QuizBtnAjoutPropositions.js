import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const QuizBtnAjoutPropositions = ({ navigation, route }) => {
    const { questions } = route.params;

    const handleQuestionPress = (question) => {
        navigation.navigate('QuizPropositionsForm', { question });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Sélectionner une question :</Text>
                <Text style={styles.subtitle}>Etape 3/4</Text>
            </View>
            <View style={styles.questions}>
                {questions.map((question, index) => (
                    <TouchableOpacity key={index} style={styles.button} onPress={() => handleQuestionPress(question)}>
                        <Text style={styles.buttonText}>{question}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    header: {
        backgroundColor: '#81B7C1',
        paddingVertical: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontStyle: 'italic',
        fontSize: 35,
        color: 'white',
    },
    questions: {
        alignItems: 'center',
        width: '100%',
        marginTop: 50
    },
    button: {
        backgroundColor: 'white',
        width: 1000,
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#81B7C1',
        textAlign: 'center',
    },
});


export default QuizBtnAjoutPropositions;
