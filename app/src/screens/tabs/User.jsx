import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Header from '../../common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import tailwind from 'twrnc';

const User = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const userJSON = await AsyncStorage.getItem('USER_DATA');
      if (userJSON) {
        const user = JSON.parse(userJSON);
        setUserData(user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('IS_USER_LOGGED_IN');
      await AsyncStorage.removeItem('USER_DATA');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <Header title={'Profile'} />
      {userData ? (
        <>
          <View style={tailwind`flex flex-row bg-[#008080] items-center p-4`}>
            <View style={tailwind`w-18 h-18 bg-cover rounded-md mr-3`}>
              <Image
                source={{
                  uri: 'https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_5.png',
                }}
                style={tailwind`rounded-full h-full w-full ring ring-gray-300 overflow-hidden shadow`}
              />
            </View>
            <View>
              <TouchableOpacity style={tailwind`focus:outline-none`}>
                <Text style={tailwind`text-lg font-bold text-white`}>
                  {userData.name}
                </Text>
              </TouchableOpacity>
              <Text style={tailwind`text-md text-white`}>{userData.email}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={tailwind`w-full self-center border-b-[#DBDBDB] justify-center mt-2 px-2`}
            onPress={() => {
              navigation.navigate('Orders');
            }}>
            <View style={tailwind`flex flex-row items-center border-b py-2`}>
              <Image
                source={require('../../images/order.png')}
                style={tailwind`w-6 h-6 mr-2`}
              />
              <Text style={tailwind`text-black`}>My Orders</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={tailwind`w-full self-center border-b-[#DBDBDB] justify-center mt-2 px-2`}
            onPress={() => {
              navigation.navigate('Addresses');
            }}>
            <View style={tailwind`flex flex-row items-center border-b py-2`}>
              <Image
                source={require('../../images/address.png')}
                style={tailwind`w-6 h-6 mr-2`}
              />
              <Text style={tailwind`text-black`}>Your Addresses</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={tailwind`w-full self-center border-b-[#DBDBDB] justify-center mt-2 px-2`}>
            <View style={tailwind`flex flex-row items-center border-b py-2`}>
              <Image
                source={require('../../images/payment.png')}
                style={tailwind`w-6 h-6 mr-2`}
              />
              <Text style={tailwind`text-black`}>Payment Methods</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={tailwind`w-full self-center border-b-[#DBDBDB] justify-center mt-2 px-2`}
            onPress={() => {
              logout();
            }}>
            <View style={tailwind`flex flex-row items-center border-b py-2`}>
              <Image
                source={require('../../images/logout.png')}
                style={tailwind`w-6 h-6 mr-2`}
              />
              <Text style={tailwind`text-black`}>Log out</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <View style={tailwind`flex-1 justify-center items-center`}>
          <Text>Not Logged In</Text>
          <Text
            style={tailwind`mt-20 text-lg underline`}
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            Sign up
          </Text>
        </View>
      )}
    </View>
  );
};

export default User;


