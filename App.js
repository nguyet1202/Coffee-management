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
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={{color: 'black', fontSize: 25}}>Friends</Text>
          <Image
            style={styles.iconSearch}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/54/54481.png',
            }}
          />
        </View>
        <View style={styles.viewBotton}>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={{color: 'black', fontSize: 15}}>suggestion</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={{color: 'black', fontSize: 15}}>Your Friends</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
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
