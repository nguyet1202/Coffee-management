import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import IntroScreen from './src/screens/IntroScreen';
import AddnewModal from './src/components/AddnewModal';
import WarehouseScreen from './src/screens/WarehouseScreen';
const App = () => {
  return (
    <SafeAreaView>
      <AddnewModal />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
