import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const AjoutQuizScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([]);

    const handleQuestionChange = (index, text) => {
        setQuestions(prevState => {
            const updatedQuestions = [...prevState];
            updatedQuestions[index].text = text;
            return updatedQuestions;
        });
    };

    const handlePropositionChange = (questionIndex, propositionIndex, text, isCorrect) => {
        setQuestions(prevState => {
            const updatedQuestions = [...prevState];
            updatedQuestions[questionIndex].propositions[propositionIndex].text = text;
            updatedQuestions[questionIndex].propositions[propositionIndex].isCorrect = isCorrect;
            return updatedQuestions;
        });
    };

    const ajoutQuiz = async () => {
        try {
            const response = await fetch('https://memoboostpii.azurewebsites.net/api/QuizApi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Questions: questions.map(q => {
                        return {
                            Text: q.question,
                            Propositions: q.reponses.map(p => {
                                return {
                                    Text: p.label,
                                    IsCorrect: p.correct
                                };
                            })
                        };
                    })
                })
            });
            if (!response.ok) {
                throw new Error('Erreur : la réponse n\'a pas été correctement renvoyée');
            } else {
                navigation.navigate('Quiz');
            }
        } catch (error) {
            console.error(`Erreur lors de la création du quiz: ${error.message}`);
        }
    };

    return (
        <View style={styles.part1}>
            <View style={styles.header}>
                <Text style={styles.title}>Ajouter un nouveau quiz</Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Titre"
                    onChangeText={setTitle}
                    value={title}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.textArea}
                    placeholder="Description"
                    onChangeText={setDescription}
                    value={description}
                    multiline={true}
                    numberOfLines={4}
                    autoCapitalize="none"
                />
                <View style={styles.ligneView}>
                    <View style={styles.ligne} />
                    <View>
                        <Text style={styles.titleQuestion}>Ajouter des questions</Text>
                    </View>
                    <View style={styles.ligne} />
                </View>
            </View>
            <View style={styles.questions}>
                {questions.map((question, questionIndex) => (
                    <View key={questionIndex}>
                        <TextInput
                            style={styles.input}
                            placeholder={`Question ${questionIndex + 1}`}
                            onChangeText={(text) => handleQuestionChange(questionIndex, text)}
                            value={question.text}
                            autoCapitalize="none"
                        />
                        {question.reponses.map((reponse, reponseIndex) => (
                            <View key={reponseIndex} style={styles.reponse}>
                                <CheckBox
                                    value={reponse.correct}
                                    onValueChange={(value) =>
                                        handlePropositionChange(
                                            questionIndex,
                                            reponseIndex,
                                            reponse.label,
                                            value
                                        )
                                    }
                                />
                                <TextInput
                                    style={styles.inputReponse}
                                    placeholder={`Réponse ${reponseIndex + 1}`}
                                    onChangeText={(text) =>
                                        handlePropositionChange(
                                            questionIndex,
                                            reponseIndex,
                                            text,
                                            reponse.correct
                                        )
                                    }
                                    value={reponse.label}
                                    autoCapitalize="none"
                                />
                            </View>
                        ))}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() =>
                                handleAddReponse(questionIndex, {
                                    label: '',
                                    correct: false,
                                })
                            }
                        >
                            <Text style={styles.buttonText}>Ajouter une réponse</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddQuestion}
                >
                    <Text style={styles.buttonText}>Ajouter une question</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    part1: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        alignSelf: 'stretch',
        backgroundColor: '#81B7C1',
        paddingVertical: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'white',
    },
    form: {
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '70%',
        marginTop: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#81B7C1',
        borderWidth: 2.5,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#F5FCFF',
        fontSize: 25,
    },
    textArea: {
        width: '100%',
        borderColor: '#81B7C1',
        borderWidth: 2.5,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#F5FCFF',
        fontSize: 25,
        height: 200,
        textAlignVertical: 'top'
    },
    ligneView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 23,
    },
    ligne: {
        flex: 1,
        height: 3,
        backgroundColor: '#81B7C1'
    },
    questions: {
        alignItems: 'flex-end',
        width: '68%'
    },
    titleQuestion: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#81B7C1',
        width: 300,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#81B7C1',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 60,
        minWidth: 150,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
    },
});


export default AjoutQuizScreen;