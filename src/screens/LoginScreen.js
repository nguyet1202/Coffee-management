import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.containInput}>
          <Text style={styles.text}>Email</Text>
          <TextInput placeholder="Enter your email" style={styles.input} />
        </View>
        <View style={styles.containInput}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.forgot}>Forgot your password?</Text>
      </View>
    </KeyboardAvoidingView>
  );
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
