import React, {useState} from 'react';
import {View, Text, TextInput, Alert, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import tailwind from 'twrnc';

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
    <View style={tailwind`flex-1 items-center justify-center bg-slate-50`}>
      <View style={tailwind`p-8 w-full max-w-sm`}>
        <Text
          style={tailwind`text-5xl font-bold mb-6 text-center text-slate-900`}>
          Sign Up
        </Text>

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Enter you Name"
          value={name}
          onChangeText={txt => setName(txt)}
        />

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Enter Your Email"
          value={email}
          onChangeText={txt => setEmail(txt)}
        />

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Enter Your Mobile"
          value={mobile}
          onChangeText={txt => setMobile(txt)}
        />

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Enter Your Password"
          secureTextEntry={true}
          value={password}
          onChangeText={txt => setPassword(txt)}
        />

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Confirm Your Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={txt => setConfirmPassword(txt)}
        />
        <Pressable
          onPress={() => addUser()}
          style={tailwind`h-12 bg-[#008080] rounded-md flex flex-row justify-center items-center px-6`}>
          <View style={tailwind`flex-1 flex items-center`}>
            <Text style={tailwind`text-white text-base font-medium`}>
              Sign Up
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={tailwind`text-blue-400 text-lg text-center mt-4`}>
            Sign In
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Signup;
