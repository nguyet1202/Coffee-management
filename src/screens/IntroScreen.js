import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const IntroScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.column} />
      <View style={styles.column1} />
      <View style={styles.img}>
        <Image source={require('../assets/images/brand.png')} />
      </View>
      <View style={styles.logo}>
        <Image source={require('../assets/images/logo.png')} />
      </View>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  column: {
    width: width / 2,
    height: height,
    backgroundColor: '#FFBF1C',
  },
  column1: {
    width: width / 2,
    height: height,
    backgroundColor: '#FFFFFF',
  },
  img: {
    marginLeft: 120,
    marginTop: 150,
    position: 'absolute',
  },
  logo: {
    marginLeft: 70,
    marginTop: 250,
    position: 'absolute',
  },
});
