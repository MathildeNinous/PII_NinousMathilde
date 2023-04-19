import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import QuizScreen from './QuizScreen';

const QuizQuestionsScreen = ({ route, navigation }) => {
    const quizId = route.params;
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const [showAnswer, setShowAnswer] = useState(false);
    const [userAnswer, setUserAnswer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    //méthode qui prend un ID de quiz et renvoie ses questions
    const fetchQuestions = async (quizId) => {
        try {
            setLoading(true);
            const response = await fetch(`https://memoboostpii.azurewebsites.net/api/QuestionApi/GetQuestionsQuizById/${quizId}`);
            const data = await response.json();
            const questionsWithPropositions = await Promise.all(
                data.map(async (question) => {
                    const propositions = await fetchQuestionPropositions(question.id);
                    return {
                        ...question,
                        propositions,
                    };
                })
            );
            setQuestions(questionsWithPropositions);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    //méthode qui prend un ID de question et renvoie ses propositions de réponse
    const fetchQuestionPropositions = async (questionId) => {
        try {
            const response = await fetch(`https://memoboostpii.azurewebsites.net/api/PropositionApi/GetPropositionsQuestionById/${questionId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    //exécuté une fois au début
    useEffect(() => {
        fetchQuestions(quizId);
    }, [quizId]);

    //méthode pour ajouter le score à la bd
    const addScoreToBD = async () => {
        const currentDate = dayjs().format('YYYY-MM-DD');
        try {
            const response = await fetch('https://memoboostpii.azurewebsites.net/api/ScoreApi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    QuizId: quizId,
                    ValeurScore: score,
                    Date: currentDate
                })
            });

            //erreur serveur
            if (!response.ok) {
                throw new Error('Erreur : la réponse n\'a pas été correctement renvoyée');
            } else {
                // La requête POST a réussi, on renvoie les données
                return response.json();
            }
            //erreur execution de la requete
        } catch (error) {
            console.error(`Erreur lors de la création du score dans la base: ${error.message}`);
            throw error;
        }
    };

    //méthode qui gère quand l'utilisateur clique sur une proposition de réponse
    const handleAnswerPress = (selectedAnswer) => {
        setUserAnswer(selectedAnswer);
        setShowAnswer(true);

        // Vérifier si la réponse est correcte et incrémenter le score si c'est le cas
        if (selectedAnswer.isCorrect) {
            setScore(score + 1);
        }
    };

    //méthode qui gère la transition entre les différentes questions (quand l'utilisateur clique sur question suivante)
    const handleNextQuestionPress = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowAnswer(false);
        setUserAnswer(null);
    };


    // méthode qui calcule le score total du joueur 
    const calculateScore = () => {
        let totalScore = 0;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].propositions.find((answer) => answer.isCorrect).text === questions[i].userAnswer.text) {
                totalScore++;
            }
        }
        return totalScore;
    };


    //méthode qui gère quand l'utilisateur décide de terminer le quiz
    const handleFinishQuizPress = async () => {
        const score = calculateScore(); // Calculer le score
        try {
            await addScoreToBD(); // Attendre la fin de la requête POST

            // Mettre à jour l'état pour afficher le score final
            setScore(score);
            setQuizFinished(true);
            navigation.navigate('Quiz');
        } catch (error) {
            // Gérer les erreurs éventuelles
            console.error(`Erreur lors de la création du score: ${error.message}`);
        }
    };

    //si ça charge longtemps
    if (loading) {
        // Afficher l'indicateur de chargement
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    } else if (currentQuestionIndex >= questions.length) { //si on arrive à la dernière question
        // Afficher le score final
        return (
            <View style={styles.container}>
                <Text style={styles.end}>Quiz terminé ! Votre score est de {score}/{questions.length}</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz')}>
                    <Text style={styles.buttonText}>Terminer</Text>
                </TouchableOpacity>
            </View>
        );
    } else { //si on est en train de faire le quiz
        return (
            <View style={styles.container}>
                {currentQuestion ? (
                    <>
                        <Text style={styles.question}>{currentQuestion.text}</Text>
                        {currentQuestion.propositions ? (
                            <View style={styles.answerContainer}>
                                <View style={styles.buttonContainer}>
                                    {currentQuestion.propositions.map((answer, answerIndex) => {
                                        return (
                                            <TouchableOpacity
                                                key={answerIndex}
                                                style={[
                                                    styles.answerButton,
                                                    showAnswer && answer.isCorrect && styles.correctAnswer,
                                                    showAnswer && !answer.isCorrect && styles.incorrectAnswer,
                                                ]}
                                                onPress={() => handleAnswerPress(answer)}
                                                disabled={showAnswer}
                                            >
                                                <Text style={styles.answerText}>
                                                    {answer.text}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                                {showAnswer && userAnswer !== null && (
                                    <View style={styles.answerMessageContainer}>
                                        <Text style={[
                                            userAnswer.isCorrect ? styles.answerMessageCorrect : styles.answerMessageIncorrect
                                        ]}>
                                            {userAnswer.isCorrect ? 'Bonne réponse, Bravo ! ' : `Mauvaise réponse ! La réponse correcte était "${currentQuestion.propositions.find(answer => answer.isCorrect)?.text}"`}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        ) : (
                            <></>
                        )}
                        {showAnswer && (
                            <TouchableOpacity style={styles.button} onPress={handleNextQuestionPress}>
                                <Text style={styles.buttonText}>Question suivante</Text>
                            </TouchableOpacity>
                        )}
                        {currentQuestionIndex === questions.length - 1 && !showAnswer && (
                            <TouchableOpacity style={styles.button} onPress={handleFinishQuizPress}>
                                <Text style={styles.buttonText}>Terminer le quiz</Text>
                            </TouchableOpacity>
                        )}

                    </>
                ) : (
                    <></>
                )}
            </View>
        )
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#E6E6E6'
    },
    question: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        lineHeight: 50,
    },
    answerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: 30,
    },
    answerButton: {
        backgroundColor: '#eee',
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginVertical: 15,
    },
    answerMessageCorrect: {
        color: '#2196F3',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    answerMessageIncorrect: {
        color: '#2196F3',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    answerText: {
        textAlign: 'center',
        fontSize: 30,
    },
    correctAnswer: {
        backgroundColor: '#8ccfa1',
    },
    incorrectAnswer: {
        backgroundColor: '#ff9e93',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#2196F3',
        borderRadius: 15,
        paddingVertical: 13,
        minWidth: '30%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    answerMessageContainer: {
        marginBottom: 20
    },
    end: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        lineHeight: 40,
    },
});


export default QuizQuestionsScreen;
