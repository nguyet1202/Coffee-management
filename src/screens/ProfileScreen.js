import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import useFirestoreCollection from '../hooks/useFirestoreCollection';
import storage from '@react-native-firebase/storage';

const ProfileScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [avt, setAvt] = useState('');
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
  const LoadLib = async () => {
    try {
      const imageResult = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      if (imageResult) {
        const imageName = imageResult.path.substring(
          imageResult.path.lastIndexOf('/') + 1,
        );
        const bucketFile = `image/${imageName}`;
        const pathToFile = imageResult.path;
        const reference = storage().ref(bucketFile);
        const task = await reference.putFile(pathToFile);
        const url = await storage()
          .ref(task.metadata.fullPath)
          .getDownloadURL();
        console.log(url);
        setAvt(url);
      }
    } catch (error) {}
  };
  const Edit = item => {
    setName(item.Name);
    setEmail(item.Email);
    setBirthday(item.birthday);
    setPhone(item.phone);
    setAvt(item.avt);
    setModalVisible(true);
  };
  const btnSave = item => {
    firestore()
      .collection('users')
      .doc(item.id)
      .update({
        Name: name,
        Email: email,
        birthday: birthday,
        phone: phone,
        avt: avt,
      })
      .then(() => {
        navigation.navigate('ProfileScreen');
        alert('Update successfully');
      })
      .catch(error => {
        alert(error.message);
      });
    setModalVisible(false);
  };
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
            <Text
              style={styles.btnText}
              onPress={() => {
                Edit(item);
              }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed');
              setModalVisible(!modalVisible);
            }}>
            <View style={ModalForm.containModal}>
              <Text style={ModalForm.title}>Make your profile</Text>
              <Image source={{uri: item.avt}} style={styles.imgUp} />
              <TouchableOpacity style={styles.btnUp} onPress={LoadLib}>
                <Text style={styles.textUp}>Choose image</Text>
              </TouchableOpacity>
              <TextInput
                defaultValue={item.Name}
                onChangeText={text => setName(text)}
                style={ModalForm.input}
              />
              <TextInput
                defaultValue={item.Email}
                onChangeText={text => setEmail(text)}
                style={ModalForm.input}
              />
              <TextInput
                defaultValue={item.birthday}
                onChangeText={text => setBirthday(text)}
                style={ModalForm.input}
              />
              <TextInput
                defaultValue={item.phone}
                onChangeText={text => setPhone(text)}
                style={ModalForm.input}
              />
              <TouchableOpacity style={ModalForm.btnSave}>
                <Text style={ModalForm.textSave} onPress={() => btnSave(item)}>
                  Save
                </Text>
              </TouchableOpacity>
              <Pressable
                style={ModalForm.btnClose}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={ModalForm.textClose}>Exit</Text>
              </Pressable>
            </View>
          </Modal>
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
  imgUp: {
    height: 150,
    width: 150,
    borderRadius: 360,
  },
  btnUp: {
    height: 30,
    width: 100,
    backgroundColor: '#FFBF1C',
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textUp: {
    color: 'white',
    fontWeight: '500',
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
const ModalForm = StyleSheet.create({
  containModal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  title: {
    fontSize: 24,
    color: '#FFBF1C',
    fontWeight: '500',
    marginBottom: 30,
  },
  input: {
    borderRadius: 10,
    width: 320,
    marginBottom: 15,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 15,
  },
  btnSave: {
    width: 200,
    height: 50,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFBF1C',
    marginTop: 30,
  },
  textSave: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  btnClose: {
    width: 200,
    height: 50,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFBF1C',
    marginTop: 10,
  },
  textClose: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
});
