import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/DogPage.jsx";
import Matches from "./components/Matches.jsx";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Fur-Ever Friend" component={Home} />
        <Stack.Screen name="Pup Pocket" component={Matches} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
