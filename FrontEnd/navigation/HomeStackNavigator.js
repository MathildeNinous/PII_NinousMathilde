import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen';
import InscriptionScreen from '../screens/InscriptionScreen';
import ConnexionScreen from '../screens/ConnexionScreen';
import QuizInfoForm from "../screens/QuizInfoForm";
import QuizQuestionsForm from "../screens/QuizQuestionsForm";
import QuizPropositionsForm from "../screens/QuizPropositionsForm";
import QuizBtnAjoutPropositions from "../screens/QuizBtnAjoutPropositions";

// Screen stack for Ecole search by Home tab
const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, tabBarVisible: false }} />
            <HomeStack.Screen name="Inscription" component={InscriptionScreen} options={{ headerTitle: '' }} />
            <HomeStack.Screen name="Connexion" component={ConnexionScreen} options={{ headerTitle: '' }} />
            <HomeStack.Screen name="QuizInfoForm" component={QuizInfoForm} options={{ headerTitle: '' }} />
            <HomeStack.Screen name="QuizQuestionsForm" component={QuizQuestionsForm} options={{ headerTitle: '' }} />
            <HomeStack.Screen name="QuizPropositionsForm" component={QuizPropositionsForm} options={{ headerTitle: '' }} />
            <HomeStack.Screen name="QuizBtnAjoutPropositions" component={QuizBtnAjoutPropositions} options={{ headerTitle: '' }} />
        </HomeStack.Navigator>
    );
};

export default HomeStackNavigator;
