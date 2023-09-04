import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet} from 'react-native';
import HomeScreen from './HomeScreen';

const Drawer = createDrawerNavigator();
const Main = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: true}}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Main;
