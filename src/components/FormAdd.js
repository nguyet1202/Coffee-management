import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import React, {useState} from 'react';
const HEIGHT_MODAL = 570;
const WIDTH_MODAL = Dimensions.get('window').width;
const ModalAdd = props => {
  const [textcategoryId, onChangetextcategoryId] = useState('');
  const [textingredients, onChangetextingredients] = useState('');
  const [textname, onChangetextname] = useState('');
  const [textprice, onChangetextprice] = useState('');
  const [Img, setImg] = useState('');
  const closeModal = (bool, data) => {
    props.changeModalVisible(bool);
    // props.setData(null);
  };
  async function addItem() {
    firestore()
      .collection('products')
      .add({
        categoryId: textcategoryId,
        ingredients: textingredients,
        name: textname,
        price: textprice,
        img: Img,
      })
      .then(() => {
        alert('thành công');
      })
      .catch(error => {
        alert(error.message);
      });
  }
  const choosePic = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const imageName = image.path.substring(image.path.lastIndexOf('/') + 1);
      const bucketFile = `image/${imageName}`;
      const pathToFile = image.path;
      console.log('link ở đây nèeeee', pathToFile);
      let reference = storage().ref(bucketFile);
      let task = reference.putFile(pathToFile);
      task
        .then(() => {
          console.log('Image uploaded to the bucket!');
          console.log('Image', pathToFile);
          setImg(pathToFile);
        })
        .catch(e => console.log('uploading image error => ', e));
    });
  };
  function ButtonSave() {
    if (
      textcategoryId.length == 0 ||
      textingredients.length == 0 ||
      textname == 0 ||
      textprice == 0
    ) {
      alert('The fields are required');
      return;
    }
    addItem();
  }
  console.log('hê hê', Img);
  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <Text style={styles.text}>ADD NEW PRODUCT</Text>
          <TouchableOpacity onPress={() => closeModal(false, 'Cancel')}>
            <Image
              style={{width: 40, height: 40, margin: 5}}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/458/458594.png',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.TouchableOpacity}>
            <TextInput
              onChangeText={onChangetextname}
              value={textname}
              placeholder="Enter name"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity}>
            <TextInput
              onChangeText={onChangetextprice}
              value={textprice}
              placeholder="Enter Price"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity}>
            <TextInput
              onChangeText={onChangetextcategoryId}
              value={textcategoryId}
              placeholder="Enter categoryId"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity}>
            <TextInput
              onChangeText={onChangetextingredients}
              value={textingredients}
              placeholder="Enter ingredients"
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.label}>Image</Text>
            <TouchableOpacity style={styles.imgGroup} onPress={choosePic}>
              <Image
                style={{width: 50, height: 50, margin: 5}}
                source={require('../assets/images/library.png')}
              />
              <Image
                style={{width: 100, height: 100, margin: 5}}
                source={{uri: Img}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btnAdd} onPress={() => ButtonSave()}>
            <Text style={styles.txtBtn}>Add new</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ModalAdd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    height: HEIGHT_MODAL,
    width: WIDTH_MODAL - 80,
    paddingTop: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
  },
  text: {
    paddingLeft: 10,
    margin: 13,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0077EA',
  },
  TouchableOpacity: {
    width: '80%',
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  textView: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonView: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAdd: {
    margin: 10,
    width: 120,
    backgroundColor: '#0077EA',
    borderRadius: 10,
  },
  label: {
    padding: 10,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imgGroup: {
    width: '60%',
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 100,
    borderRadius: 5,
  },
  btnUpload: {
    width: 80,
    backgroundColor: '#FFBF1C',
    borderRadius: 10,
  },
  txtBtn: {
    color: '#F2F2F2',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
  },
});
