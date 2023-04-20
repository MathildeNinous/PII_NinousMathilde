import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChoixActiScreen from '../screens/ChoixActiScreen';
import QuizScreen from '../screens/QuizScreen';
import QuizQuestionsScreen from '../screens/QuizQuestionsScreen';
import MiniJeuScreen from "../screens/MiniJeuScreen";

// Screen stack for Ecole search by Home tab
const QuizStack = createNativeStackNavigator();

const QuizStackNavigator = () => {
    return (
        <QuizStack.Navigator initialRouteName="Quiz">
            <QuizStack.Screen name="ChoixActi" component={ChoixActiScreen} options={{ headerTitle: '' }} />
            <QuizStack.Screen name="Quiz" component={QuizScreen} options={{ headerTitle: '' }} />
            <QuizStack.Screen name="QuizQuestions" component={QuizQuestionsScreen} options={{ headerTitle: '' }} />
            <QuizStack.Screen name="MiniJeu" component={MiniJeuScreen} options={{ headerTitle: '' }} />
        </QuizStack.Navigator>
    );
};

export default QuizStackNavigator;
