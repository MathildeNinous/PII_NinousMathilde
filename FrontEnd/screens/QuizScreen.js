import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const QuizScreen = () => {
    const [quizData, setQuizData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetch('https://memoboostpii.azurewebsites.net/api/QuizApi')
            .then(response => response.json())
            .then(data => setQuizData(data))
            .catch(error => console.log(error));
    }, [quizData]);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('QuizQuestions', item.id)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Ionicons name="arrow-forward" size={28} color="#555" style={styles.icon} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Liste des quiz</Text>
            <FlatList
                data={quizData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={3}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F1',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 10,
    },
    header: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    },
    card: {
        padding: 20,
        margin: 10,
        color: "#384A64",
        backgroundColor: '#F5FCFF',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 3,
        width: '30%'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#384A64',
        marginBottom: 12,
    },
    description: {
        fontSize: 20,
        color: '#555',
        marginBottom: 16,
    },
    icon: {
        marginLeft: 'auto',
    },
});

export default QuizScreen;




