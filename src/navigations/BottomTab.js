import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Homepage from '../screens/Homepage';
import ProfileScreen from '../screens/ProfileScreen';
import RevenueScreen from '../screens/RevenueScreen';
import StatisticManagement from '../screens/StatisticScreen';
const BottomTab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <BottomTab.Navigator sceneContainerStyle={{backgroundColor: 'white'}}>
      <BottomTab.Screen
        name="Homepage"
        component={Homepage}
        options={() => {
          return {
            tabBarLabel: ({focused}) => {
              return (
                <Text style={{color: focused ? 'red' : 'black'}}>
                  {'Homepage'}
                </Text>
              );
            },
            tabBarIcon: ({color, size}) => (
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
                }}
                style={{width: 20, height: 20}}
              />
            ),
            headerShown: false,
          };
        }}
      />
      <BottomTab.Screen
        name="RevenueScreen"
        component={RevenueScreen}
        options={() => {
          return {
            tabBarLabel: ({focused}) => {
              return (
                <Text style={{color: focused ? 'red' : 'black'}}>
                  {'Revenue'}
                </Text>
              );
            },
            tabBarIcon: ({color, size}) => (
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/493/493380.png',
                }}
                style={{width: 20, height: 20}}
              />
            ),
            headerShown: false,
          };
        }}
      />
      <BottomTab.Screen
        name="StatisticManagement"
        component={StatisticManagement}
        options={() => {
          return {
            tabBarLabel: ({focused}) => {
              return (
                <Text style={{color: focused ? 'red' : 'black'}}>
                  {'Static'}
                </Text>
              );
            },
            tabBarIcon: ({color, size}) => (
              <Image
                source={{
                  uri: 'https://icons.veryicon.com/png/o/system/linear-chh/order-27.png',
                }}
                style={{width: 20, height: 20}}
              />
            ),
            headerShown: false,
          };
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={() => {
          return {
            tabBarLabel: ({focused}) => {
              return (
                <Text style={{color: focused ? 'red' : 'black'}}>
                  {'Profile'}
                </Text>
              );
            },
            tabBarIcon: ({color, size}) => (
              <Image
                source={{
                  uri: 'https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account.png',
                }}
                style={{width: 20, height: 20}}
              />
            ),
            headerShown: false,
          };
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
