import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useEffect} from 'react';
import useFirestoreCollection from '../hooks/useFirestoreCollection';
import firestore from '@react-native-firebase/firestore';
import WarehouseHeader from '../components/WarehouseHeader';
import ItemCard from '../components/ItemCard';
const Homepage = () => {
  const collection = firestore().collection('products');
  const pageSize = 6;
  const page = 2;
  const {data, loading, error, refresh} = useFirestoreCollection(
    collection,
    pageSize,
    page,
  );
  useEffect(() => {
    refresh();
  }, []);

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  const renderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyMessageStyle}>Empty</Text>
      </View>
    );
  };
  return (
    <>
      {loading ? (
        <ActivityIndicator color="#00ff00" size="large" />
      ) : (
        <FlatList
          style={styles.container}
          ListHeaderComponent={WarehouseHeader}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={item => item.id}
          data={data}
          renderItem={({item}) => {
            return <ItemCard item={item} />;
          }}
          onRefresh={refresh}
          refreshing={loading}
        />
      )}
    </>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchBar: {
    width: 300,
    height: 42,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFBF1C',
    borderRadius: 10,
    backgroundColor: '#F4F1F1',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyMessageStyle: {
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
});
