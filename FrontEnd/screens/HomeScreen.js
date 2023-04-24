import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

const backgroundImage = require("../assets/4.jpg");

//Page d'accueil
const HomeScreen = ({ navigation }) => {
    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Mémo'Boost</Text>
                <Text style={styles.subtitle}>Le jeu pour booster votre mémoire</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("QuizStack", { screen: "ChoixActi" })}
                >
                    <Text style={styles.buttonText}>Commencer</Text>
                </TouchableOpacity>
            </View>
            <View style={{ borderBottomColor: '#bbb', borderBottomWidth: 2 }} />
            <View style={styles.footer}>
                <Text style={styles.footerText}>Vous êtes un proche de l'utilisateur ? </Text>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Inscription')}>
                    <Text style={styles.footerButtonText}>S'inscrire</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Connexion')}>
                    <Text style={styles.footerButtonText}>Se connecter</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 100,
    },
    title: {
        fontSize: 60,
        marginTop: 50,
        fontWeight: "bold",
        color: "#ffffff",
        textShadowColor: "#000000",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        marginTop: 10,
        marginBottom: 15,
        textShadowColor: "#000000",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        opacity: 0.9,
    },
    button: {
        backgroundColor: "#81B7C1",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 50,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 23,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    footer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        padding: 20,
    },
    footerText: {
        color: "#ffffff",
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    footerButton: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#ffffff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        borderRadius: 7,
    },
    footerButtonText: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
});

export default HomeScreen;
