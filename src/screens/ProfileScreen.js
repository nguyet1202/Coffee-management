import auth from '@react-native-firebase/auth';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
const ProfileScreen = ({navigation}) => {
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Home');
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.backgroundProfile} />
      <Image source={require('../assets/img/avt.png')} style={styles.img} />
      <View style={styles.info}>
        <View style={styles.row}>
          <Image
            source={require('../assets/img/name.png')}
            style={styles.imgIcon}
          />
          <Text style={styles.infoText}>Ba Thi Co Gai</Text>
        </View>
        <View style={styles.row}>
          <Image
            source={require('../assets/img/email.png')}
            style={styles.imgIcon}
          />
          <Text style={styles.infoText}>bacogaiver3@gmail.com</Text>
        </View>

        <View style={styles.row}>
          <Image
            source={require('../assets/img/password.png')}
            style={styles.imgIcon}
          />
          <Text style={styles.infoText}>bacogai123</Text>
        </View>

        <View style={styles.row}>
          <Image
            source={require('../assets/img/phone.png')}
            style={styles.imgIcon}
          />
          <Text style={styles.infoText}>0376272111</Text>
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
