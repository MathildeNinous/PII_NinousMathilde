import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import moment from 'moment';

const StatScreen = () => {
    const [quizData, setQuizData] = useState([]);
    const [scoreData, setScoreData] = useState([]);

    //récupère tous les quiz 
    const fetchQuizData = async () => {
        try {
            const response = await fetch('https://memoboostpii.azurewebsites.net/api/QuizApi');
            const data = await response.json();
            setQuizData(data);
        } catch (error) {
            console.log(error);
        }
    };

    //récupère tous les scores
    const fetchScoreData = async () => {
        try {
            const response = await fetch('https://memoboostpii.azurewebsites.net/api/ScoreApi');
            const data = await response.json();
            setScoreData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchQuizData();
        fetchScoreData();
    }, [quizData, scoreData]);

    //retourne le score le plus élevé en filtrant les donénes
    const getBestScore = quizId => {
        //on filtre les données de score (scoreData) pour récupérer les scores correspondant à ce quiz
        const filteredScores = scoreData.filter(score => score.quizId === quizId);

        //calcul score le plus élevé
        const highestScore = filteredScores.length > 0 ? Math.max(...filteredScores.map(score => score.valeurScore), -Infinity) : null;
        return highestScore;

    }

    const renderQuizItem = ({ item }) => (
        <View style={styles.quizItem}>
            <Text style={styles.quizTitle}>{item.title}</Text>
            {renderScores(item.id)}
        </View>
    );

    // affiche les scores d'un quiz donné
    const renderScores = quizId => {
        const filteredScores = scoreData.filter(score => score.quizId === quizId);
        const scoresCount = filteredScores.length;
        const highestScore = getBestScore(quizId);
        return (
            <View style={styles.scoresContainer}>
                <Text style={styles.scoresCountText}>{scoresCount} scores comptabilisés</Text>
                {scoresCount > 0 && (
                    <FlatList
                        data={filteredScores}
                        renderItem={({ item }) => (
                            <View style={styles.scoreItem}>
                                <Text style={styles.scoreValue}>Score obtenu : {item.valeurScore}/5</Text>
                                <Text style={styles.scoreDate}>A la date :  {moment(item.date).format('DD/MM/YYYY')}</Text>
                            </View>
                        )}
                        keyExtractor={item => item.id.toString()}
                        style={styles.scoresList}
                    />
                )}
                <Text style={styles.highestScoreText}>Meilleur score : {highestScore}/5</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tableau des scores</Text>
            <FlatList
                data={quizData}
                renderItem={renderQuizItem}
                keyExtractor={item => item.id.toString()}
                style={styles.quizList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#81B7C1',
        marginBottom: 20,
        textAlign: 'center',
    },
    quizList: {
        flexGrow: 1,
    },
    quizItem: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#81B7C1',
        borderRadius: 10,
    },
    quizTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#81B7C1',
        marginBottom: 10,
    },
    scoresContainer: {
        marginTop: 5,
    },
    scoreValue: {
        fontSize: 20
    },
    scoreDate: {
        fontSize: 20,
        marginBottom: 10
    },
    scoresCountText: {
        color: '#81B7C1',
        fontSize: 20,
        marginBottom: 15,
    },
    highestScoreText: {
        color: '#81B7C1',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default StatScreen;