import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import useCollections from '../hooks/useCollections';

const RevenueScreen = () => {
  const collection = 'expenses';
  const collection1 = 'orders';
  const limit = 20;
  const orderBy = 'total';
  const rank = 'desc';
  const {exp, reve} = useCollections(
    collection,
    collection1,
    limit,
    orderBy,
    rank,
  );
  let revenues = reve.reduce(function (sum, curValue) {
    return sum + curValue.total;
  }, 0);
  let totalExpenses = exp.reduce(function (sum, curValue) {
    return sum + curValue.price;
  }, 0);
  let profit = revenues - totalExpenses;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/revenue.png')} />
        <Text style={styles.title}>BA CO GAI SHOP</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.wraper}>
        <View style={styles.expenses}>
          <Text style={styles.txt}>Expenses</Text>
          <Text style={styles.value}>{totalExpenses} VND</Text>
        </View>
        <View style={styles.expenses}>
          <Text style={styles.txt}>Revenue</Text>
          <Text style={styles.value}>{revenues} VND</Text>
        </View>
        <View style={styles.expenses}>
          <Text style={styles.txt}>Profit</Text>
          <Text style={styles.value}>{profit} VND</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default RevenueScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFBF1C',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 100,
    height: '60%',
  },
  title: {
    color: '#221406',
    fontSize: 30,
    lineHeight: 30,
    fontWeight: '700',
  },
  expenses: {
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A77E52',
    width: 200,
    height: 215,
    borderRadius: 10,
  },
  txt: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
  },
  value: {
    padding: 20,
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  wraper: {
    paddingTop: 20,
  },
});
