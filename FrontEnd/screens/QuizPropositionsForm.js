import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const QuizPropositionsForm = ({ navigation, route }) => {
    const { question } = route.params;
    const [propositions, setPropositions] = useState(Array(3).fill().map(() => ({ text: '', isCorrect: false })));


    const handlePropositionChange = (index, text) => {
        const newPropositions = [...propositions];
        newPropositions[index].text = text;
        setPropositions(newPropositions);
    };

    const handlePropositionCheck = (index, isChecked) => {
        const newPropositions = [...propositions];
        newPropositions[index].isCorrect = isChecked;
        setPropositions(newPropositions);
    };

    const submitPropositions = async () => {
        // envoyer les propositions au serveur
        try {
            const propositionDTOs = propositions.map(proposition => ({
                Text: proposition.text,
                IsCorrect: proposition.isCorrect,
                QuestionId: question.Id
            }));
            const response = await fetch(`https://memoboostpii.azurewebsites.net/api/QuestionApi/${question.Id}/AddPropositions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(propositionDTOs),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            console.log("propositions", propositionDTOs)
            navigation.navigate('QuizBtnAjoutPropositions');
        } catch (error) {
            console.error(error);
            // Afficher un message d'erreur à l'utilisateur
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Ajouter des propositions de réponses</Text>
                    <Text style={styles.subtitle}>Etape 4/4</Text>
                </View>
                <View style={styles.form}>
                    <Text style={styles.question}>{question}</Text>
                    {propositions.map((proposition, index) => (
                        <View key={index} style={styles.proposition}>
                            <TextInput
                                style={styles.input}
                                placeholder={`Proposition ${index + 1}`}
                                onChangeText={(text) => handlePropositionChange(index, text)}
                                value={proposition.text}
                            />
                            <TouchableOpacity
                                style={styles.checkbox}
                                onPress={() => handlePropositionCheck(index, !proposition.isCorrect)}
                            >
                                {proposition.isCorrect ? (
                                    <View style={styles.checkedBox} />
                                ) : (
                                    <View style={styles.uncheckedBox} />
                                )}
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <TouchableOpacity style={styles.button} onPress={submitPropositions}>
                    <Text style={styles.buttonText}>Ajouter les propositions</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        fontStyle: 'italic',
        fontSize: 35,
        color: 'white',
    },
    form: {
        marginVertical: 20,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    proposition: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedBox: {
        width: 10,
        height: 10,
        borderRadius: 2,
        backgroundColor: 'black',
    },
    uncheckedBox: {
        width: 10,
        height: 10,
        borderRadius: 2,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default QuizPropositionsForm;