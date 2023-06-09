import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';

//Page contenant les 5 questions venant d'etre crees (sous forme de boutons cliquables)
const QuizBtnAjoutPropositions = ({ navigation, route }) => {
    const { questions, addedQuestionId } = route.params || {};
    const [cpt, setCpt] = useState(1);

    //savoir si la question à deja été traitée ou non
    const isQuestionAdded = (question) => {
        if (!addedQuestionId) {
            return false;
        }
        const addedQuestion = questions.find(q => q.id === addedQuestionId);
        return addedQuestion && addedQuestion.id === question.id;
    };

    //quand l'utilisateur appuie sur une question lors de la navigation sur l'écran de QuizInfoForm
    const handleQuestionPress = (question) => {
        setCpt(cpt + 1);
        navigation.navigate('QuizPropositionsForm', { question, questions, cpt: cpt });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
        >
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Sélectionner une question :</Text>
                        <Text style={styles.subtitle}>Etape 3/4</Text>
                    </View>
                    <View style={styles.questions}>
                        {questions ? questions.map((question, index) => (
                            <TouchableOpacity key={index} style={styles.button} onPress={() => handleQuestionPress(question)}>
                                <Text style={styles.buttonText}>{question}</Text>
                            </TouchableOpacity>
                        )) : null}
                        {cpt == 6 ? (
                            <TouchableOpacity style={styles.buttonFinish} onPress={() => navigation.navigate('Quiz')}>
                                <Text style={styles.buttonTextFinish}>Terminer la création du quiz</Text>
                            </TouchableOpacity>
                        ) : (<></>)}
                    </View>
                </View >
            </ScrollView>
        </KeyboardAvoidingView>
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
    buttonFinish: {
        backgroundColor: '#81B7C1',
        width: 1000,
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginBottom: 30,
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
    buttonTextFinish: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
});


export default QuizBtnAjoutPropositions;
