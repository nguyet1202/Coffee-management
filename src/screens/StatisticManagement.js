import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
const StatisticManagement = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.TopContent}>
        <TouchableOpacity style={styles.numberinMonth}>
          <Text style={styles.CountnumberinMonth}>10000</Text>
          <Text style={styles.TextnumberinMonth}>products</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Sold in December</Text>
      </View>
      <View style={styles.BotContent}>
        <TouchableOpacity style={styles.bestSell}>
          <Text style={styles.bestSell_title}>Best-selling product</Text>
          <View style={styles.bestSell_button}>
            <TouchableOpacity style={styles.bestSell_mainbutton}>
              <Text style={styles.bestSell_nameProduct}>Cà phê sữa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bestSell_count}>
              <Text style={{fontSize: 20, color: '#EE0808', fontWeight: '600'}}>
                450 products
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.unsold}>
          <Text style={styles.bestSell_title}>Most - unsold product</Text>
          <View style={styles.bestSell_button}>
            <TouchableOpacity style={styles.bestSell_mainbutton}>
              <Text style={styles.bestSell_nameProduct}>Trà Lựu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bestSell_count}>
              <Text style={{fontSize: 20, color: '#EE0808', fontWeight: '600'}}>
                20 products
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default StatisticManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  TopContent: {
    height: 370,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  numberinMonth: {
    borderRadius: 200,
    width: 220,
    height: 220,
    backgroundColor: '#654D33',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  CountnumberinMonth: {
    fontSize: 55,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  TextnumberinMonth: {
    fontSize: 22,
    color: '#FFBF1C',
    fontWeight: '500',
    textAlign: 'center',
  },
  title: {
    paddingTop: 15,
    fontSize: 25,
    color: '#F23030',
    fontWeight: '700',
  },
  BotContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
  },
  unsold: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#654D33',
    width: '90%',
    display: 'flex',
    // height: 120,
    marginTop: 20,
  },
  bestSell: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FFBF1C',
    width: '90%',
    display: 'flex',
    // height: 120,
    marginTop: 10,
  },
  bestSell_title: {
    paddingTop: 10,
    fontSize: 28,
    color: '#000000',
    fontWeight: '600',
    textAlign: 'center',
  },
  bestSell_button: {
    width: 320,
    padding: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
