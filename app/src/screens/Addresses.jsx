import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteAddress} from '../redux/slices/AddressSlice';
import tailwind from 'twrnc';

const Addresses = () => {
  const navigation = useNavigation();
  const addressList = useSelector(state => state.address);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const defaultAddress = async item => {
    await AsyncStorage.setItem(
      'MY_ADDRESS',
      '' +
        item.city +
        ',' +
        item.state +
        ',' +
        item.pincode +
        ',type:' +
        item.type,
    );
    navigation.goBack();
  };

  useEffect(() => {
    console.log(addressList);
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        title={'My Addresses'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={addressList.data}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              style={tailwind`border border-gray-300 mt-2 mx-2 p-1 rounded-lg `}
              onPress={() => {
                defaultAddress(item);
              }}>
              <View
                style={tailwind`w-full flex flex-row items-center mb-1 transform overflow-hidden rounded-lg bg-white mx-auto p-2`}>
                <View
                  style={tailwind`w-16 h-16 p-1 flex items-center justify-center`}>
                  {item.type == 'office' && (
                    <Image
                      source={require('../images/office.png')}
                      style={tailwind`w-full h-full`}
                    />
                  )}
                  {item.type == 'Home' && (
                    <Image
                      source={require('../images/home.png')}
                      style={tailwind`w-full h-full`}
                    />
                  )}
                </View>

                <View style={tailwind`px-2 w-[84%] bg-transparent`}>
                  <View
                    style={tailwind`w-full flex flex-row items-center justify-between`}>
                    <View>
                      <Text
                        style={tailwind`text-lg font-bold text-black capitalize`}>
                        {item.type} Address
                      </Text>
                      <Text style={tailwind`text-lg capitalize`}>
                        {item.state}, {item.city}, {item.pincode}
                      </Text>
                    </View>

                    <View>
                      <TouchableOpacity
                        style={tailwind`w-6 h-6`}
                        onPress={() => {
                          dispatch(deleteAddress(item.id));
                        }}>
                        <Image
                          style={tailwind`w-full h-full`}
                          source={require('../images/delete.png')}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={tailwind`w-6 h-6 mt-4`}
                        onPress={() => {
                          navigation.navigate('AddAddress', {
                            type: 'edit',
                            data: item,
                          });
                        }}>
                        <Image
                          style={tailwind`w-full h-full`}
                          source={require('../images/edit.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('AddAddress', {type: 'new'});
        }}>
        <Text style={{fontSize: 30, color: '#fff'}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Addresses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#EC8A00',
    borderRadius: 25,
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  state: {color: '#000', fontSize: 18},
  bottomView: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
  },
  bottomicon: {
    width: 24,
    height: 24,
  },
});
