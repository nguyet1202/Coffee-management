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
import ItemCard from '../components/ItemCard';
import {useNavigation} from '@react-navigation/native';
import IntroScreen from './IntroScreen';

const collection = firestore().collection('products');
const pageSize = 6;
const page = 2;
const Homepage = () => {
  const navigation = useNavigation();

  const {
    data,
    loading,
    error,
    refresh,
    searchFilterFunction,
    search,
    filteredDataSource,
  } = useFirestoreCollection(collection, pageSize, page);
  useEffect(() => {
    refresh();
  }, []);

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  const WarehouseHeader = () => {
    return (
      <View style={styles.container_header}>
        <View style={styles.search}>
          <TextInput
            style={styles.searchBar}
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search..."
          />
          <TouchableOpacity>
            <Image
              style={styles.filter}
              source={require('../assets/images/filter.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btnWraper}>
          <TouchableOpacity
            style={styles.AddBtn}
            onPress={() => navigation.navigate('Addpage')}>
            <Text style={styles.txtBtn}>Add new</Text>
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
        <IntroScreen />
      ) : (
        <FlatList
          style={styles.container}
          ListHeaderComponent={WarehouseHeader}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={item => item.id}
          data={filteredDataSource || data}
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
  container_header: {
    margin: 10,
  },
  search: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btnWraper: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  AddBtn: {
    padding: 10,
    width: 120,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#A77E52',
    right: 0,
  },
  txtBtn: {
    color: '#FFBF1C',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  filter: {
    width: 38,
    height: 30,
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
