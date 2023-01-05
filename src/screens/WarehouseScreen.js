import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import WarehouseHeader from '../components/WarehouseHeader';
import ItemCard from '../components/ItemCard';
const WarehouseScreen = () => {
  return (
    <View>
      <WarehouseHeader />
      <ItemCard />
    </View>
  );
};

export default WarehouseScreen;

const styles = StyleSheet.create({});
