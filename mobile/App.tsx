import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import Login from './src/Login/Login';

const Stack = createStackNavigator();

export default function App() {
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
