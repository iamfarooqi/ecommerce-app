import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './screens/SignUp';
import SignInScreen from './screens/SignIn';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="home-screen"
            // screenOptions={{
            //     headerStyle: {
            //         backgroundColor: '#9400D3',
            //     },
            //     headerTintColor: '#fff',
            //     headerTitleStyle: {
            //         fontWeight: 'bold',
            //     },
            // }}
            >
                <Stack.Screen name="home-screen" component={HomeScreen} options={{ title: 'Home' }} />
                <Stack.Screen name="sign-up" component={SignUpScreen} options={{ title: 'Sign Up' }} />
                <Stack.Screen name="sign-in" component={SignInScreen} options={{ title: 'Sign In' }} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

const styles = StyleSheet.create({})

export default AppNavigator;
