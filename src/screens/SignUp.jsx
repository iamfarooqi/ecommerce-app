import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import CustomButton from '../common/CustomButton';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const addUser = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Password and Confirm Password must match');
      return;
    }

    try {
      const uid = uuid.v4();
      await firestore().collection('Users').doc(uid).set({
        name,
        email,
        mobile,
        password,
        userId: uid,
      });
      console.log('User added!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>

      <TextInput
        placeholder="Enter Name"
        style={styles.input}
        value={name}
        onChangeText={txt => setName(txt)}
      />

      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />

      <TextInput
        placeholder="Enter Mobile"
        style={styles.input}
        value={mobile}
        onChangeText={txt => setMobile(txt)}
      />

      <TextInput
        placeholder="Enter Password"
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />

      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={txt => setConfirmPassword(txt)}
      />

      <CustomButton
        bg="#E27800"
        title="Sign up"
        color="#fff"
        onClick={addUser}
      />

      <Text
        style={styles.loginText}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        Login
      </Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#000',
    fontSize: 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    marginBottom: 10,
  },
  loginText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});
