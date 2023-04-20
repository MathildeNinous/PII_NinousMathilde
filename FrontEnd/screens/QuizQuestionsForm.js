import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';

const QuizQuestionsForm = ({ navigation, route }) => {
    const { quizId } = route.params;
    const [questions, setQuestions] = useState(Array(5).fill(''));

    const handleQuestionChange = (index, text) => {
        const newQuestions = [...questions];
        newQuestions[index] = text;
        setQuestions(newQuestions);
    };

    const submitQuestions = async () => {
        try {
            const questionDTOs = questions.map(text => ({ Text: text, QuizId: quizId }));

            const response = await fetch(`https://memoboostpii.azurewebsites.net/api/QuizApi/${quizId}/AddQuestions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(questionDTOs),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            navigation.navigate('QuizBtnAjoutPropositions', { questions: questions });
        } catch (error) {
            console.error(error);
            // Afficher un message d'erreur à l'utilisateur
        }
    };

    const renderItem = ({ item, index }) => (
        <TextInput
            style={styles.input}
            placeholder={`Question ${index + 1}`}
            onChangeText={text => handleQuestionChange(index, text)}
            value={item}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Ajouter des questions</Text>
                <Text style={styles.subtitle}>Etape 2/4</Text>
            </View>
            <View style={styles.questions}>
                <FlatList
                    data={questions}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity style={styles.button} onPress={submitQuestions}>
                    <Text style={styles.buttonText}>Passer à l'étape suivante</Text>
                </TouchableOpacity>
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
    },
    input: {
        height: 50,
        width: 700,
        borderColor: '#81B7C1',
        borderWidth: 2.5,
        marginVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#F5FCFF',
        fontSize: 23,
    },
    button: {
        backgroundColor: '#81B7C1',
        padding: 10,
        borderRadius: 10,
        minWidth: 350,
    },
    buttonText: {
        color: '#fff',
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default QuizQuestionsForm;
