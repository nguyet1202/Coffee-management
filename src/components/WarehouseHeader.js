import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const WarehouseHeader = () => {
  const navigation = useNavigation();
  const [isStatus, setisStatus] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput style={styles.searchBar} placeholder="Search..." />
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

export default WarehouseHeader;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  search: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
