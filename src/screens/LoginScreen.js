import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
const LoginScreen = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const resetPassword = () => {
    if (email !== '') {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          alert('Check your email to reset password');
        })
        .catch(err => console.log(err.message));
    } else {
      alert('Please enter a valid email');
    }
  };
  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Main');
        console.log('loginnnnnn');
      })
      .catch(err => console.log(err.message));
  };

  if (initializing) return null;
  if (!user) {
    return (
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.containInput}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />
          </View>
          <View style={styles.containInput}>
            <Text style={styles.text}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
              style={styles.input}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetPassword}>
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  input: {
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 15,
    width: '90%',
    marginBottom: 20,
  },
  containInput: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'left',
    fontWeight: '900',
    color: '#654D33',
    width: '90%',
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFBF1C',
    textAlign: 'center',
    marginBottom: 50,
  },
  btn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: '100%',
  },
  btnText: {
    backgroundColor: '#FFBF1C',
    padding: 15,
    borderRadius: 20,
    width: '90%',
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  forgot: {
    textAlign: 'center',
    color: '#FFBF1C',
    fontSize: 18,
    fontStyle: 'italic',
  },
});
