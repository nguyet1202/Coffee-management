<<<<<<< HEAD
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
import firestore from '@react-native-firebase/firestore';
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
=======
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import Homepage from './src/screens/Homepage';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="Home" component={Homepage} />
      </Stack.Navigator>
    </NavigationContainer>
>>>>>>> ad515d1e7f10b0311bd8166cf9bdcd2b01f81311
  );

<<<<<<< HEAD
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

export default App;

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
=======
export default App;

const styles = StyleSheet.create({});
>>>>>>> ad515d1e7f10b0311bd8166cf9bdcd2b01f81311
