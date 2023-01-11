import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  TextInput,
  Dimensions,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
const HEIGHT_MODAL = 570;
const WIDTH_MODAL = Dimensions.get('window').width;
const ItemCard = ({item}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryId, setcategoryId] = useState(item.categoryId);
  const [ingredients, setingredients] = useState(item.ingredients);
  const [name, setname] = useState(item.name);
  const [price, setprice] = useState(item.price);
  const [img, setImg] = useState(item.img);
  async function deleteItem() {
    await firestore()
      .collection('products')
      .doc(item.id)
      .delete()
      .then(() => {
        alert('Deleted Item Successfully!');
      })
      .catch(error => {
        alert(error.message);
      });
  }
  const Edit = () => {
    setcategoryId(categoryId);
    setingredients(ingredients);
    setname(name);
    setprice(price);
    setImg(img);
    setModalVisible(true);
  };
  async function UpdateItem() {
    firestore()
      .collection('products')
      .doc(item.id)
      .update({
        categoryId: categoryId,
        ingredients: ingredients,
        name: name,
        price: price,
        img: img,
      })
      .then(() => {
        alert('thành công');
        setModalVisible(false);
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
      categoryId.length == 0 ||
      ingredients.length == 0 ||
      name == 0 ||
      price == 0
    ) {
      alert('The fields are required');
      return;
    }
    UpdateItem();
  }
  return (
    <View style={styles.wraper}>
      <View style={styles.maincontainer}>
        <View style={styles.leftContent}>
          <Image style={styles.img} source={{uri: item.img}} />
          <View style={styles.btnGroup}>
            <TouchableOpacity
              style={styles.btnUpdate}
              onPress={() => {
                Edit(item);
              }}>
              <Text style={styles.txtUpdate}>UPDATE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnDelete}
              onPress={() => deleteItem()}>
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
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed');
            setModalVisible(!modalVisible);
          }}>
          <TouchableOpacity disabled={true} style={styles.container}>
            <View style={styles.modal}>
              <View style={styles.textView}>
                <Text style={styles.text}>ADD NEW PRODUCT</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
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
                    onChangeText={setname}
                    value={name}
                    placeholder="Enter name"
                  />
                  {/* <Text>{item.name}</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.TouchableOpacity}>
                  <TextInput
                    onChangeText={setprice}
                    value={price}
                    placeholder="Enter Price"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.TouchableOpacity}>
                  <TextInput
                    onChangeText={setcategoryId}
                    value={categoryId}
                    placeholder="Enter categoryId"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.TouchableOpacity}>
                  <TextInput
                    onChangeText={setingredients}
                    value={ingredients}
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
                      source={{uri: img}}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={() => {
                    ButtonSave();
                  }}>
                  <Text style={styles.txtBtn}>Add new</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  wraper: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 20,
  },
  maincontainer: {
    width: '90%',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#A77E52',
    borderRadius: 5,
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
    width: 140,
    height: 108,
    borderRadius: 20,
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    gap: 10,
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
