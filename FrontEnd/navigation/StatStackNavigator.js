import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StatScreen from "../screens/StatScreen";

// Screen stack for Ecole search by name tab
const StatStack = createNativeStackNavigator();

const StatStackNavigator = () => {
    return (
        <StatStack.Navigator initialRouteName="Stat">
            <StatStack.Screen name="Stat" component={StatScreen} options={{ headerShown: false }} />
        </StatStack.Navigator>
    );
};

export default StatStackNavigator;