import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CheckBox from 'expo-checkbox';

const AjoutQuizScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([
        { text: '', propositions: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }] },
        { text: '', propositions: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }] },
        { text: '', propositions: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }] },
        { text: '', propositions: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }] },
        { text: '', propositions: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }] }
    ]);

    const handleQuestionChange = (index, value) => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            newQuestions[index] = { ...newQuestions[index], text: value };
            return newQuestions;
        });
    };

    const handlePropositionChange = (questionIndex, propositionIndex, value) => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            const newPropositions = [...newQuestions[questionIndex].propositions];
            newPropositions[propositionIndex] = { ...newPropositions[propositionIndex], text: value };
            newQuestions[questionIndex] = { ...newQuestions[questionIndex], propositions: newPropositions };
            return newQuestions;
        });
    };

    const updateIsCorrectProposition = (questionIndex, propositionIndex) => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            const newPropositions = [...newQuestions[questionIndex].propositions];
            newPropositions.forEach((prop, index) => {
                newPropositions[index] = { ...prop, isCorrect: index === propositionIndex };
            });
            newQuestions[questionIndex] = { ...newQuestions[questionIndex], propositions: newPropositions };
            return newQuestions;
        });
    };


    const ajoutQuiz = async () => {
        const quiz = {
            title: title,
            description: description,
            questions: questions.map(q => ({
                text: q.text,
                propositions: q.propositions.map(p => ({
                    text: p.text,
                    isCorrect: p.isCorrect
                }))
            }))
        };

        try {
            const response = await fetch('https://memoboostpii.azurewebsites.net/api/QuizApi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(quiz)
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            const quizId = data.id;

            // Ajouter les questions au quiz en utilisant l'ID retourné
            const questionsResponse = await fetch(`https://memoboostpii.azurewebsites.net/api/QuizApi/${quizId}/AddQuestions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(questions)
            });

            if (!questionsResponse.ok) {
                throw new Error(`Error ${questionsResponse.status}: ${questionsResponse.statusText}`);
            }

            navigation.navigate('Quiz');
        } catch (error) {
            console.error(error);
            // Afficher un message d'erreur à l'utilisateur
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Ajouter un nouveau quiz</Text>
                </View>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder='Titre du quiz'
                        onChangeText={text => setTitle(text)}
                        value={title}
                    />
                    <TextInput
                        style={styles.textArea}
                        placeholder='Description'
                        onChangeText={text => setDescription(text)}
                        value={description}
                    />
                    <View style={styles.hr}>
                        <View style={styles.trait} />
                        <View>
                            <Text style={styles.textHr}>Ajouter vos questions</Text>
                        </View>
                        <View style={styles.trait} />
                    </View>
                    {questions.map((question, index) => (
                        <View key={index} style={styles.questionContainer}>
                            <Text style={styles.questionNumber}>Question {index + 1} :</Text>
                            <TextInput
                                style={styles.questionInput}
                                placeholder='Entrez votre question'
                                onChangeText={text => handleQuestionChange(index, text)}
                                value={question.text}
                            />
                            <View style={styles.propositionsContainer}>
                                <Text style={styles.checkboxText}>Cochez la bonne réponse</Text>
                                <View style={styles.propositionContainer}>
                                    <CheckBox
                                        value={question.propositions[0].isCorrect}
                                        onValueChange={() => updateIsCorrectProposition(index, 0)}
                                    />
                                    <TextInput
                                        style={styles.propositionInput}
                                        placeholder='Proposition 1'
                                        onChangeText={text => handlePropositionChange(index, 0, text)}
                                        value={question.propositions[0].text}
                                    />
                                </View>
                                <View style={styles.propositionContainer}>
                                    <CheckBox
                                        value={question.propositions[1].isCorrect}
                                        onValueChange={() => updateIsCorrectProposition(index, 1)}
                                    />
                                    <TextInput
                                        style={styles.propositionInput}
                                        placeholder='Proposition 2'
                                        onChangeText={text => handlePropositionChange(index, 1, text)}
                                        value={question.propositions[1].text}
                                    />
                                </View>
                                <View style={styles.propositionContainer}>
                                    <CheckBox
                                        value={question.propositions[2].isCorrect}
                                        onValueChange={() => updateIsCorrectProposition(index, 2)}
                                    />
                                    <TextInput
                                        style={styles.propositionInput}
                                        placeholder='Proposition 3'
                                        onChangeText={text => handlePropositionChange(index, 2, text)}
                                        value={question.propositions[2].text}
                                    />
                                </View>
                            </View>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.button} onPress={ajoutQuiz}>
                        <Text style={styles.buttonText}>Ajouter le quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
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
    textArea: {
        width: '100%',
        borderColor: '#81B7C1',
        borderWidth: 2.5,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#F5FCFF',
        fontSize: 20,
        height: 200,
        textAlignVertical: 'top',
        paddingTop: 10
    },
    form: {
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '70%',
        marginTop: 30,
    },
    hr: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    trait: {
        flex: 1,
        height: 3,
        backgroundColor: '#81B7C1'
    },
    textHr: {
        width: 260,
        fontSize: 23,
        textAlign: 'center',
        color: '#81B7C1',
        fontWeight: 'bold'
    },
    questionContainer: {
        marginVertical: 10,
        backgroundColor: 'red',
        width: '100%',
        backgroundColor: 'rgba(129, 183, 193, 0.4)',
        padding: 15,
        borderRadius: 8,
    },
    questionNumber: {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    questionInput: {
        height: 50,
        width: '100%',
        borderColor: '#81B7C1',
        borderWidth: 2.5,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#F5FCFF',
        fontSize: 20,
    },
    propositionsContainer: {
        alignItems: 'center',
    },
    propositionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    propositionInput: {
        height: 50,
        width: '80%',
        borderColor: '#81B7C1',
        borderWidth: 2.5,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#F5FCFF',
        fontSize: 20,
        marginLeft: 10,
    },
    checkboxText: {
        fontSize: 20,
        fontStyle: 'italic',
        marginBottom: 7
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#81B7C1',
        borderWidth: 2.5,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#F5FCFF',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#81B7C1',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 60,
        minWidth: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
    },
});


export default AjoutQuizScreen;