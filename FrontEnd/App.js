import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './screens/HomeScreen';
import ChoixActiScreen from './screens/ChoixActiScreen';
import QuizScreen from './screens/QuizScreen';
import QuizQuestionsScreen from './screens/QuizQuestionsScreen';
import InscriptionScreen from './screens/InscriptionScreen';
import ConnexionScreen from './screens/ConnexionScreen';
import QuizInfoForm from "./screens/QuizInfoForm";
import QuizQuestionsForm from "./screens/QuizQuestionsForm";
import MiniJeuScreen from "./screens/MiniJeuScreen";
import QuizPropositionsForm from "./screens/QuizPropositionsForm";
import QuizBtnAjoutPropositions from "./screens/QuizBtnAjoutPropositions";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="QuizInfoForm">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChoixActi" component={ChoixActiScreen} options={{ headerTitle: '' }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerTitle: '' }} />
        <Stack.Screen name="Inscription" component={InscriptionScreen} options={{ headerTitle: '' }} />
        <Stack.Screen name="Connexion" component={ConnexionScreen} options={{ headerTitle: '' }} />
        <Stack.Screen name="QuizQuestions" component={QuizQuestionsScreen} options={{ headerTitle: '' }} />
        <Stack.Screen name="QuizInfoForm" component={QuizInfoForm} options={{ headerTitle: '' }} />
        <Stack.Screen name="QuizQuestionsForm" component={QuizQuestionsForm} options={{ headerTitle: '' }} />
        <Stack.Screen name="MiniJeu" component={MiniJeuScreen} options={{ headerTitle: '' }} />
        <Stack.Screen name="QuizPropositionsForm" component={QuizPropositionsForm} options={{ headerTitle: '' }} />
        <Stack.Screen name="QuizBtnAjoutPropositions" component={QuizBtnAjoutPropositions} options={{ headerTitle: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



