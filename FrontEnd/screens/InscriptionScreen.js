import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';


const InscriptionScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleInscription = async () => {
        try {
            const response = await fetch('https://memoboostpii.azurewebsites.net/api/UserApi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: email,
                    Password: password,
                    FirstName: firstName,
                    LastName: lastName
                })
            });

            //erreur serveur
            if (!response.ok) {
                throw new Error('Erreur : la réponse n\'a pas été correctement renvoyée');
            } else {
                // L'utilisateur a été créé avec succès
                navigation.navigate('Connexion');
            }
            //erreur execution de la requete
        } catch (error) {
            console.error(`Erreur lors de la création de l'utilisateur: ${error.message}`);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.popup}>
                <View style={styles.header}>
                    <Text style={styles.title}>Inscription</Text>
                </View>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Prénom"
                        onChangeText={setFirstName}
                        value={firstName}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nom"
                        onChangeText={setLastName}
                        value={lastName}
                        autoCapitalize="none"
                    />
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
                    <TouchableOpacity style={styles.button} onPress={handleInscription}>
                        <Text style={styles.buttonText}>S'inscrire</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
    }
});


export default InscriptionScreen;