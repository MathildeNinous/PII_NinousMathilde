import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';

const ConnexionScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleConnexion = async () => {
        try {
            const response = await fetch('https://memoboostpii.azurewebsites.net/api/UserApi/authentification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: email,
                    Password: password
                })
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de la connexion: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            if (data.success) {
                navigation.navigate('CreationQuestions', { username: data.user.username });
            } else {
                setErrorMessage('Email ou mot de passe incorrect');
            }

        } catch (error) {
            console.error(`Erreur lors de la connexion: ${error.message}`);
            setErrorMessage('Une erreur est survenue lors de la connexion');
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.popup}>
                <View style={styles.header}>
                    <Text style={styles.title}>Connexion</Text>
                </View>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={setEmail}
                        value={email}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={true}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleConnexion}>
                        <Text style={styles.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
                    <View style={styles.signupTextContainer}>
                        <Text style={styles.signupText}>Vous n'avez pas de compte?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
                            <Text style={styles.signupLink}>Inscrivez-vous</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    popup: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '70%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        alignSelf: 'stretch',
        backgroundColor: '#81B7C1',
        paddingVertical: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
        marginBottom: 10
    },
    form: {
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '60%',
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
    button: {
        backgroundColor: '#81B7C1',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
        minWidth: 150,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
    },
    signupTextContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        fontSize: 23,
        color: '#81B7C1'
    },
    signupLink: {
        fontWeight: 'bold',
        color: '#81B7C1',
        marginLeft: 5,
        fontSize: 23,
    }
});


export default ConnexionScreen;