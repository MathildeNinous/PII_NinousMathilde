import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StatScreen from "../screens/StatScreen";

//Définition d'une pile d'écrans de navigation pour la page de statistiques
const StatStack = createNativeStackNavigator();

const StatStackNavigator = () => {
    return (
        <StatStack.Navigator initialRouteName="Stat">
            <StatStack.Screen name="Stat" component={StatScreen} options={{ headerShown: false }} />
        </StatStack.Navigator>
    );
};

export default StatStackNavigator;