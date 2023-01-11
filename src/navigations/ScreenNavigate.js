import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import BottomTabs from './BottomTab';
import Addpage from '../screens/addpage';

const Stack = createNativeStackNavigator();
const ScreenNavigate = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Addpage" component={Addpage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigate;

const styles = StyleSheet.create({});
