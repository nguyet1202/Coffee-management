import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const ProductCard = ({item}) => {
  return (
    <TouchableOpacity style={styles.bestSell}>
      <View style={styles.bestSell_button}>
        <TouchableOpacity style={styles.bestSell_mainbutton}>
          <Text style={styles.bestSell_nameProduct}>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bestSell_count}>
          <Text style={{fontSize: 20, color: '#EE0808', fontWeight: '600'}}>
            {item.quantity} orders
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  bestSell: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FFBF1C',
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // height: 120,
    margin: 20,
  },
  bestSell_button: {
    width: 320,
    padding: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bestSell_mainbutton: {
    width: 115,
    height: 50,
    borderWidth: 1,
    borderColor: '#84705B',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bestSell_nameProduct: {
    fontSize: 20,
    color: '#000000',
  },
  bestSell_count: {
    fontSize: 17,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
