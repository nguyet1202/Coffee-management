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

const App = () => {
  // const collection = firestore().collection('products');
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
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Image style={styles.img} source={{uri: item.img}} />
        <TouchableOpacity style={styles.tilte}>
          <Text style={styles.tilteText}>{item?.name}</Text>
          <View style={styles.buttoninfor}>
            <TouchableOpacity style={styles.smallinfor}>
              <Image
                source={{
                  uri: 'https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png',
                }}
                style={{width: 12, height: 12, marginTop: 1}}
              />
              <Text
                style={{color: '#000000', fontSize: 10, fontWeight: 'bold'}}>
                {item?.price}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallinfor}>
              <Image
                source={{
                  uri: 'https://newtechco.com.vn/wp-content/uploads/2019/06/icon-dung-thoigian.png',
                }}
                style={{width: 12, height: 12, marginRight: 3}}
              />
              <Text
                style={{color: '#000000', fontSize: 10, fontWeight: 'bold'}}>
                {item?.ingredients}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator color="#00ff00" size="large" />
      ) : (
        <FlatList
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
    width: '92%',
    marginLeft: 15,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  img: {
    width: 170,
    height: 220,
    borderRadius: 15,
    opacity: 0.9,
  },
  item: {
    position: 'relative',
    width: 180,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  tilte: {
    position: 'absolute',
    top: 150,
    left: 10,
    textAlign: 'center',
    width: 150,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    opacity: 2,
    borderRadius: 7,
  },
  tilteText: {
    textAlign: 'center',
    color: '#044040',
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 6,
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
  buttoninfor: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
  smallinfor: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 3,
    paddingRight: 3,
  },
});
