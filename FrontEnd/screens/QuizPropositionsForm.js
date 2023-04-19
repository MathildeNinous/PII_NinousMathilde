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
                <View style={styles.propositions}>
                    <Text style={styles.question}>{question}</Text>
                    <Text style={styles.indication}>----------------------- Cochez la bonne réponse -----------------------</Text>
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
                    <TouchableOpacity style={styles.button} onPress={submitPropositions}>
                        <Text style={styles.buttonText}>Ajouter les propositions</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
    propositions: {
        marginVertical: 20,
        alignItems: 'center',
        width: '100%',
        marginTop: 50
    },
    question: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#81B7C1',
    },
    proposition: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        width: 600
    },
    input: {
        flex: 1,
        borderWidth: 1,
        height: 50,
        borderColor: '#81B7C1',
        borderWidth: 2.5,
        borderRadius: 10,
        padding: 10,
        fontSize: 23,
        marginRight: 10,
    },
    checkbox: {
        width: 40,
        height: 40,
        borderWidth: 3,
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
    indication: {
        fontSize: 25,
        fontStyle: "italic",
        marginTop: 20,
        marginBottom: 15,
        color: '#81B7C1'
    },
    button: {
        backgroundColor: '#81B7C1',
        padding: 10,
        borderRadius: 10,
        width: 350,
        marginBottom: 100,
        marginTop: 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default QuizPropositionsForm;