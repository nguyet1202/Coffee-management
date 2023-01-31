import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const HeaderStatistic = ({total}) => {
  return (
    <View style={styles.TopContent}>
      <TouchableOpacity style={styles.numberinMonth}>
        <Text style={styles.CountnumberinMonth}>{total}</Text>
        <Text style={styles.TextnumberinMonth}>products</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Have been sold</Text>
      <Text style={styles.bestSell_title}>Trending Drink</Text>
    </View>
  );
};

export default HeaderStatistic;

const styles = StyleSheet.create({
  TopContent: {
    height: 370,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  numberinMonth: {
    borderRadius: 200,
    width: 220,
    height: 220,
    backgroundColor: '#654D33',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  CountnumberinMonth: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  TextnumberinMonth: {
    fontSize: 22,
    color: '#FFBF1C',
    fontWeight: '500',
    textAlign: 'center',
  },
  title: {
    paddingTop: 15,
    fontSize: 25,
    color: '#F23030',
    fontWeight: '700',
  },
  bestSell_title: {
    paddingTop: 10,
    fontSize: 28,
    color: '#000000',
    fontWeight: '600',
    textAlign: 'center',
  },
});
