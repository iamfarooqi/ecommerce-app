import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../common/CustomButton';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('Users')
        .where('email', '==', email)
        .get();

      if (querySnapshot.docs.length > 0) {
        const user = querySnapshot.docs[0].data();
        if (user.password === password) {
          // Store user data in AsyncStorage
          await AsyncStorage.setItem('IS_USER_LOGGED_IN', 'yes');
          await AsyncStorage.setItem('USER_DATA', JSON.stringify(user)); // Store user data as JSON string
          navigation.navigate('Main');
        } else {
          Alert.alert('Wrong Password');
        }
      } else {
        Alert.alert('No user found');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />

      <TextInput
        placeholder="Enter Password"
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />

      <CustomButton
        bg="#E27800"
        title="Login"
        color="#fff"
        onClick={loginUser}
      />

      <Text
        style={styles.loginText}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        Sign up
      </Text>
    </View>
  );
};

export default Login;

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
