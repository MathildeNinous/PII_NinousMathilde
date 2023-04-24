import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const quizImage = require("../assets/quiz.jpg");
const miniJeuImage = require("../assets/mini-jeux.png");

//Page qui permet de choisir entre deux activités (quiz et mini-jeu)
const ChoixActiScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Qu'aimeriez-vous faire aujourd'hui ?</Text>
            <TouchableOpacity
                style={styles.sectionButton}
                onPress={() => navigation.navigate("Quiz")}
                accessibilityLabel="Quiz"
            >
                <Image
                    source={quizImage}
                    style={styles.sectionImage}
                    accessible={true}
                    accessibilityLabel="Quiz"
                />
                <Text style={styles.sectionText}>Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.sectionButton}
                onPress={() => navigation.navigate("MiniJeu")}
                accessibilityLabel="Mini-jeu"
            >
                <Image
                    source={miniJeuImage}
                    style={styles.sectionImage}
                    accessible={true}
                    accessibilityLabel="Mini-jeu"
                />
                <Text style={styles.sectionText}>Mini-jeu</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E6E6E6",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 50,
        textAlign: "center",
        color: "#333333",
        textTransform: "uppercase",
    },
    sectionButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: 50,
        paddingVertical: 50,
        paddingHorizontal: 50,
        marginVertical: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    sectionImage: {
        width: 60,
        height: 60,
        marginRight: 20,
    },
    sectionText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#000",
        textTransform: "uppercase",
    },
});

export default ChoixActiScreen;