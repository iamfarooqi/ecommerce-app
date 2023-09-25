import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Header from '../../common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

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
    <View style={styles.container}>
      <Header title={'Profile'} />
      {userData ? (
        <>
          <Image
            source={require('../../images/default_user.png')}
            style={styles.user}
          />
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={[styles.name, {fontSize: 16, marginTop: 0}]}>
            {userData.email}
          </Text>
          <TouchableOpacity
            style={[styles.tab, {marginTop: 10}]}
            onPress={() => {
              navigation.navigate('Orders');
            }}>
            <Text style={styles.txt}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, {marginTop: 10}]}
            onPress={() => {
              navigation.navigate('Addresses');
            }}>
            <Text style={styles.txt}>Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
            <Text style={styles.txt}>Payment Methods</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, {marginTop: 10}]}
            onPress={() => {
              logout();
            }}>
            <Text style={styles.txt}>Log out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.noItems}>
          <Text>Not Logged In</Text>
          <Text
            style={styles.loginText}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  user: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
  },
  name: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  tab: {
    width: '90%',
    height: 50,
    borderBottomWidth: 0.3,
    alignSelf: 'center',
    borderBottomColor: '#DBDBDB',
    paddingLeft: 20,
    justifyContent: 'center',
  },
  txt: {
    color: '#000',
  },
  noItems: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});
