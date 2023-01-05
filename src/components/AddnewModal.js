import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const AddnewModal = () => {
  return (
    <View style={styles.wraper}>
      <Text style={styles.title}>Add new product</Text>
      <View>
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.txtInput} placeholder="name..." />
        </View>
        <View>
          <Text style={styles.label}>Price</Text>
          <TextInput style={styles.txtInput} placeholder="price..." />
        </View>
        <View>
          <Text style={styles.label}>Category</Text>
          <TextInput style={styles.txtInput} placeholder="category..." />
        </View>
        <View>
          <Text style={styles.label}>Ingredients</Text>
          <TextInput style={styles.txtInput} placeholder="ingredients..." />
        </View>
        <View>
          <Text style={styles.label}>Image</Text>
          <View style={styles.imgGroup}>
            <Text style={styles.txtImg}>img.png</Text>
            <TouchableOpacity style={styles.btnUpload}>
              <Text style={styles.txtUpload}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Image
            style={styles.img}
            source={require('../assets/images/item.png')}
          />
        </View>
        <TouchableOpacity style={styles.btnAdd}>
          <Text style={styles.txtBtn}>Add new</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddnewModal;

const styles = StyleSheet.create({
  wraper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250,
    backgroundColor: 'lightgrey',
  },
  title: {
    marginTop: 10,
    color: '#FFBF1C',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  txtInput: {
    margin: 5,
    borderWidth: 1,
    borderColor: '#FFBF1C',
    padding: 5,
    width: 180,
    borderRadius: 5,
  },
  img: {
    width: 168,
    height: 76,
  },
  btnAdd: {
    margin: 10,
    width: 120,
    backgroundColor: '#654D33',
    borderRadius: 10,
  },
  txtBtn: {
    color: '#FFBF1C',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
  },
  imgGroup: {
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnUpload: {
    width: 80,
    backgroundColor: '#FFBF1C',
    borderRadius: 10,
  },
  txtUpload: {
    color: '#654D33',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
  },
  txtImg: {
    margin: 5,
    borderWidth: 1,
    borderColor: '#FFBF1C',
    padding: 5,
    width: 80,
    borderRadius: 5,
  },
});
