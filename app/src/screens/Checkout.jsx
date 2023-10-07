import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PaymentButton from '../common/PaymentButton';
import tailwind from 'twrnc';

const Checkout = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const items = useSelector(state => state.cart);
  const addressList = useSelector(state => state.address);

  const [cartItems, setCartItems] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [logInUserData, setLogInUserData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(
    'Please Select Address',
  );

  const getTotal = () => {
    let total = 0;
    try {
      if (cartItems.length > 0) {
        cartItems.map(item => {
          total = total + item.qty * item.price;
        });
      }
      return total.toFixed(0);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const userData = async () => {
    try {
      const userJSON = await AsyncStorage.getItem('USER_DATA');
      if (userJSON) {
        const user = JSON.parse(userJSON);
        setLogInUserData(user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getSelectedAddress = async () => {
    try {
      if (addressList.data.length > 0) {
        setSelectedAddress(addressList.data[0]);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const orderPlace = paymentId => {
    try {
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const hours = new Date().getHours();
      const minutes = new Date().getMinutes();
      let ampm = '';
      if (hours > 12) {
        ampm = 'pm';
      } else {
        ampm = 'am';
      }
      const data = {
        items: cartItems,
        amount: '$' + getTotal(),
        address: selectedAddress,
        paymentId: paymentId,
        paymentStatus: selectedMethod == 3 ? 'Pending' : 'Success',
        createdAt:
          day +
          '/' +
          month +
          '/' +
          year +
          ' ' +
          hours +
          ':' +
          minutes +
          ' ' +
          ampm,
      };
      return data;
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    getSelectedAddress();
    setCartItems(items.data);
    userData();
  }, [items, isFocused]);

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <Header
        leftIcon={require('../images/back.png')}
        title={'Checkout'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <View
        style={tailwind`w-full flex flex-row items-center justify-between overflow-hidden bg-white mx-auto px-2 pt-3`}>
        <View style={tailwind`flex flex-row items-center`}>
          <Text style={tailwind`font-bold text-base text-black mr-1`}>
            {cartItems && cartItems.length} Items
          </Text>
          <Text>in your cart</Text>
        </View>
        <View style={tailwind`justify-center items-center`}>
          <Text style={tailwind`text-base`}>TOTAL</Text>
          <Text style={tailwind`font-bold text-xl text-black`}>
            {'$' + getTotal()}
          </Text>
        </View>
      </View>
      <View style={tailwind`p-3`}>
        {/* ADDRESSES */}
        <Text style={tailwind`text-lg font-bold text-black`}>
          DELIVERY ADDRESS
        </Text>
        {addressList.data.length > 0 && (
          <FlatList
            data={addressList.data}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  style={tailwind`border mt-2 p-1 rounded-lg ${
                    selectedAddress.type == item.type
                      ? 'border-[#008080]'
                      : 'border-gray-300'
                  }`}
                  onPress={() => {
                    setSelectedAddress(item);
                  }}>
                  <View
                    style={tailwind`w-full flex flex-row items-center mb-1 overflow-hidden rounded-lg bg-white mx-auto p-2`}>
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
                          <Image
                            source={
                              selectedAddress.type == item.type
                                ? require('../images/radio_2.png')
                                : require('../images/radio_1.png')
                            }
                            style={[
                              {
                                width: 24,
                                height: 24,
                                tintColor:
                                  selectedAddress.type == item.type
                                    ? '#008080'
                                    : 'black',
                              },
                            ]}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
        <View style={tailwind`mt-4`}>
          <Text
            style={tailwind`text-lg font-semibold underline text-blue-600`}
            onPress={() => {
              navigation.navigate('Addresses');
            }}>
            + Add New
          </Text>
        </View>
        <Text style={tailwind`mt-4 text-lg text-gray-600`}></Text>

        {/* PAYMENT METHOD */}
        <View>
          <Text style={tailwind`text-lg font-bold text-black`}>
            PAYMENT METHOD
          </Text>
          <TouchableOpacity
            style={tailwind`flex-row items-center mt-4 pl-1`}
            onPress={() => {
              setSelectedMethod(0);
            }}>
            <Image
              source={
                selectedMethod == 0
                  ? require('../images/radio_2.png')
                  : require('../images/radio_1.png')
              }
              style={[
                {
                  width: 24,
                  height: 24,
                  tintColor: selectedMethod == 0 ? '#008080' : 'black',
                },
              ]}
            />
            <Text style={tailwind`ml-2 text-base text-black`}>Card</Text>
          </TouchableOpacity>
        </View>
      </View>
      <PaymentButton
        selectedAddress={selectedAddress}
        logInUserData={logInUserData}
        getTotal={getTotal}
        orderPlace={orderPlace}
      />
    </View>
  );
};

export default Checkout;
