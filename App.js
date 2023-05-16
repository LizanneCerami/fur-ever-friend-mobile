import React, { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/dogPage.jsx";
import Matches from "./components/Matches.jsx";


const Stack = createNativeStackNavigator();

export const MatchListContext = createContext(null);

export default function App() {
  const [matchList, setMatchList] = useState([]);
  return (
    <NativeBaseProvider>
      <MatchListContext.Provider value={{ matchList, setMatchList }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: "Fur-Ever Friend" }}
            />
            <Stack.Screen name="Pup Pocket" component={Matches} />
          </Stack.Navigator>
        </NavigationContainer>
      </MatchListContext.Provider>
    </NativeBaseProvider>
  );
}
