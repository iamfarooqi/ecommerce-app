import React, {useState} from 'react';
import {View, Text, TextInput, Alert, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tailwind from 'twrnc';

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
        if (user.password == '' && user.email == '') {
          Alert.alert('Please add your Credentials');
          return;
        }
        if (user.password !== '' && user.password === password) {
          // Store user data in AsyncStorage
          await AsyncStorage.setItem('IS_USER_LOGGED_IN', 'yes');
          await AsyncStorage.setItem('USER_DATA', JSON.stringify(user));

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
    <View style={tailwind`flex-1 items-center justify-center bg-slate-50`}>
      <View style={tailwind`p-8 w-full max-w-sm`}>
        <Text
          style={tailwind`text-5xl font-bold mb-6 text-center text-slate-900`}>
          Login
        </Text>

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Enter email address"
          value={email}
          onChangeText={txt => setEmail(txt)}
        />

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4`}
          placeholderTextColor="#000"
          placeholder="Enter password"
          secureTextEntry={true}
          value={password}
          onChangeText={txt => setPassword(txt)}
        />

        <View style={tailwind`flex flex-row justify-between items-center my-8`}>
          <View style={tailwind`flex-row items-center`}>
            <Pressable
              style={tailwind`bg-white border border-slate-200 h-6 w-6 rounded-sm mr-2 flex items-center justify-center`}>
              {/* selected state */}
              <View style={tailwind`bg-green-400 w-4 h-4 rounded-sm`} />
            </Pressable>
            <Text style={tailwind`text-slate-900`}>Remember me</Text>
          </View>
          <Pressable>
            <Text style={tailwind`text-blue-400 font-bold`}>
              Reset password
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => loginUser()}
          style={tailwind`h-12 bg-purple-500 rounded-md flex flex-row justify-center items-center px-6`}>
          <View style={tailwind`flex-1 flex items-center`}>
            <Text style={tailwind`text-white text-base font-medium`}>
              Sign In
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={tailwind`text-blue-400 text-lg text-center mt-4`}>
            Sign Up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;
