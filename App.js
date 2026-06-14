import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/Home";
import Task from "./src/Task";
import NewTask from "./src/NewTask";
import Questions from "./src/Questions"; // importe a tela Questions

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Task" component={Task} />
        <Stack.Screen name="NewTask" component={NewTask} />
        <Stack.Screen name="Questions" component={Questions} /> 
        {/* agora a rota Questions está registrada */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
