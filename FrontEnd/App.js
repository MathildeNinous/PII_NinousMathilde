import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './screens/HomeScreen';
import ChoixActiScreen from './screens/ChoixActiScreen';
import QuizScreen from './screens/QuizScreen';
import QuizQuestionsScreen from './screens/QuizQuestionsScreen';
import InscriptionScreen from './screens/InscriptionScreen';
import ConnexionScreen from './screens/ConnexionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChoixActi" component={ChoixActiScreen} options={{ headerTitle: '' }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerTitle: '' }} />
        <Stack.Screen name="Inscription" component={InscriptionScreen} options={{ headerTitle: '' }} />
        <Stack.Screen name="Connexion" component={ConnexionScreen} options={{ headerTitle: '' }} />
        <Stack.Screen name="QuizQuestions" component={QuizQuestionsScreen} options={{ headerTitle: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



