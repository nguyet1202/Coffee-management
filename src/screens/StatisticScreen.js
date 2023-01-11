import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ProductCard from '../components/ProductCard';
import HeaderStatistic from '../components/HeaderStatistic';
import useCollections from '../hooks/useCollections';
const StatisticManagement = () => {
  const collection = 'orderDetail';
  const collection1 = 'products';
  const limit = 4;
  const orderBy = 'quantity';
  const rank = 'desc';
  const {exp, reve} = useCollections(
    collection,
    collection1,
    limit,
    orderBy,
    rank,
  );
  let amoutofProducts = exp.reduce(function (sum, value) {
    return sum + value.quantity;
  }, 0);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => {
        return <HeaderStatistic total={amoutofProducts} />;
      }}
      data={reve}
      renderItem={({item}) => {
        return <ProductCard item={item} />;
      }}
      keyExtractor={item => item.id}
    />
  );
};

export default StatisticManagement;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
});
