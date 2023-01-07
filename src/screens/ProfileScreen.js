import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useFirestoreCollection from '../hooks/useFirestoreCollection';

const ProfileScreen = ({navigation}) => {
  const collection = firestore().collection('users');
  const pageSize = 1;
  const page = 1;
  const {data, loading, error, refresh} = useFirestoreCollection(
    collection,
    page,
    pageSize,
  );
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (error) {
    return error.message;
  }
  const renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundProfile} />
        <Image source={{uri: item.avt}} style={styles.img} />
        <View style={styles.info}>
          <View style={styles.row}>
            <Image
              source={require('../assets/img/name.png')}
              style={styles.imgIcon}
            />
            <Text style={styles.infoText}>{item.Name}</Text>
          </View>
          <View style={styles.row}>
            <Image
              source={require('../assets/img/email.png')}
              style={styles.imgIcon}
            />
            <Text style={styles.infoText}>{item.Email}</Text>
          </View>

          <View style={styles.row}>
            <Image
              source={require('../assets/img/birthday.png')}
              style={styles.imgIcon}
            />
            <Text style={styles.infoText}>{item.birthday}</Text>
          </View>

          <View style={styles.row}>
            <Image
              source={require('../assets/img/phone.png')}
              style={styles.imgIcon}
            />
            <Text style={styles.infoText}>{item.phone}</Text>
          </View>
        </View>
        <View style={styles.btnProfile}>
          <TouchableOpacity style={styles.edit}>
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      });
  };
  return (
    <>
      {loading ? (
        <ActivityIndicator color={'#FFBF1C'} size="large" />
      ) : (
        <FlatList
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

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundProfile: {
    backgroundColor: '#FFBF1C',
    height: 682,
    width: 682,
    borderRadius: 360,
    top: -500,
    position: 'relative',
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 360,
    position: 'absolute',
    top: 100,
  },
  info: {
    position: 'absolute',
    top: 300,
  },
  imgIcon: {
    height: 30,
    width: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20,
  },
  infoText: {
    paddingLeft: 20,
    fontSize: 18,
    color: 'black',
  },
  btnProfile: {
    position: 'absolute',
    bottom: 50,
  },
  edit: {
    height: 45,
    width: 200,
    backgroundColor: '#FFBF1C',
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logout: {
    height: 45,
    width: 200,
    backgroundColor: 'lightgray',
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});
