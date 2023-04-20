import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CheckBox from 'expo-checkbox';

const QuizInfoForm = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const ajoutQuiz = async () => {

        try {
            const response = await fetch('https://memoboostpii.azurewebsites.net/api/QuizApi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    questions: []
                }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("quiz", data)
            const quizId = data.id;

            navigation.navigate('QuizQuestionsForm', { quizId: quizId })

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
                    <Text style={styles.subtitle}>Etape 1/4</Text>
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
                </View>
                <TouchableOpacity style={styles.button} onPress={ajoutQuiz}>
                    <Text style={styles.buttonText}>Créer le quiz</Text>
                </TouchableOpacity>
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
    subtitle: {
        fontStyle: 'italic',
        fontSize: 35,
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


export default QuizInfoForm;