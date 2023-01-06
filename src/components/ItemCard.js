import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

const ItemCard = ({item}) => {
  return (
    <View style={styles.wraper}>
      <View style={styles.container}>
        <View style={styles.leftContent}>
          <Image style={styles.img} source={{uri: item.img}} />
          <View style={styles.btnGroup}>
            <TouchableOpacity style={styles.btnUpdate}>
              <Text style={styles.txtUpdate}>UPDATE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDelete}>
              <Text style={styles.txtDelete}>DELETE</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.category}>
            <Text style={styles.title}>Category</Text>
            <Text style={styles.price}>{item.categoryId}</Text>
          </View>
          <Text style={styles.title}>Ingredient</Text>
          <Text style={styles.ingre}>{item.ingredients}</Text>
        </View>
      </View>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  wraper: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 20,
  },
  container: {
    width: '90%',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#A77E52',
    borderRadius: 5,
    padding: 7,
  },
  leftContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rightContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 20,
  },
  img: {
    width: 146,
    height: 108,
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  ingre: {
    width: 170,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
  },
  title: {
    paddingRight: 10,
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  category: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
  },
  btnUpdate: {
    width: 68,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  txtUpdate: {
    textAlign: 'center',
    color: '#A77E52',
    fontSize: 14,
    fontWeight: '700',
    padding: 5,
  },
  btnDelete: {
    width: 68,
    backgroundColor: '#FFBF1C',
    borderRadius: 10,
  },
  txtDelete: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    padding: 5,
  },
});
