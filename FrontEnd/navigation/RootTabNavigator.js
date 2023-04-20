import React from "react";
import { StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StatStackNavigator from "./StatStackNavigator";
import HomeStackNavigator from "./HomeStackNavigator";
import QuizStackNavigator from "./QuizStackNavigator";

const Tab = createBottomTabNavigator();

const RootTabNavigator = () => {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#81B7C1" />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        const icons = {
                            HomeStack: "ios-home-outline",
                            QuizStack: "ios-game-controller-outline",
                            StatStack: "ios-stats-chart-outline",
                        };
                        return (
                            <Ionicons
                                name={icons[route.name] || "ios-menu"}
                                size={27} // Taille des icônes
                                color={color}
                            />
                        );
                    },
                    headerShown: false,
                    tabBarStyle: {
                        display: "flex",
                        height: 60, // Hauteur de la barre de navigation
                        alignItems: "center",
                        backgroundColor: '#DCDCDC'
                    },
                    tabBarLabelStyle: {
                        fontSize: 25, // Taille du texte des onglets
                        fontWeight: "bold",
                    },
                    tabBarVisible: route.name !== "HomeStack", // cacher la barre sur la page d'accueil
                    tabBarActiveTintColor: "#81B7C1", // Couleur de l'icône et du texte lorsqu'un onglet est sélectionné
                    tabBarInactiveTintColor: "gray", // Couleur de l'icône et du texte lorsqu'un onglet n'est pas sélectionné
                })}
            >
                <Tab.Screen
                    name="HomeStack"
                    component={HomeStackNavigator}
                    options={{ title: "Accueil" }}
                />
                <Tab.Screen
                    name="QuizStack"
                    component={QuizStackNavigator}
                    options={{ title: "Activités" }}
                />
                <Tab.Screen
                    name="StatStack"
                    component={StatStackNavigator}
                    options={{ title: "Statistiques" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
export default RootTabNavigator;
