import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import useFirestoreCollection from './src/hooks/useFirestoreCollection';
// import firestore from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
// import {firebase} from '@react-native-firebase/firestore';
import WarehouseHeader from './src/components/WarehouseHeader';
import ItemCard from './src/components/ItemCard';
const App = () => {
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
          ListHeaderComponent={() => {
            return <WarehouseHeader />;
          }}
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

export default App;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // marginLeft: 15,
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
