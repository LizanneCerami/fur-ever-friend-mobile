import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/dogPage.jsx";
import Matches from "./components/Matches.jsx";
import Footer from "./components/Footer.jsx";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ title: 'Fur-Ever Friend' }} />
          <Stack.Screen name="Pup Pocket" component={Matches} />
        </Stack.Navigator>
      <Footer />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
