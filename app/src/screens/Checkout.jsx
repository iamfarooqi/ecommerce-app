import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../redux/slices/CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PaymentButton from '../common/PaymentButton';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const items = useSelector(state => state.cart);
  const isFocused = useIsFocused();

  const [cartItems, setCartItems] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [logInUserData, setLogInUserData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(
    'Please Select Address',
  );

  const getTotal = () => {
    let total = 0;
    cartItems.map(item => {
      total = total + item.qty * item.price;
    });
    return total.toFixed(0);
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
    setSelectedAddress(await AsyncStorage.getItem('MY_ADDRESS'));
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
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        title={'Checkout'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.scrollContainer}>
        <ScrollView>
          <Text style={styles.title}>Added Items</Text>
          <View>
            <FlatList
              data={cartItems}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.productItem}
                    onPress={() => {
                      navigation.navigate('ProductDetail', {data: item});
                    }}>
                    <Image
                      source={{uri: item.image}}
                      style={styles.itemImage}
                    />
                    <View>
                      <Text style={styles.name}>
                        {item.title.length > 25
                          ? item.title.substring(0, 25) + '...'
                          : item.title}
                      </Text>
                      <Text style={styles.desc}>
                        {item.description.length > 30
                          ? item.description.substring(0, 30) + '...'
                          : item.description}
                      </Text>
                      <View style={styles.qtyview}>
                        <Text style={styles.price}>{'$' + item.price}</Text>
                        <TouchableOpacity
                          style={styles.btn}
                          onPress={() => {
                            if (item.qty > 1) {
                              dispatch(reduceItemFromCart(item));
                            } else {
                              dispatch(removeItemFromCart(index));
                            }
                          }}>
                          <Text style={{fontSize: 18, fontWeight: '600'}}>
                            -
                          </Text>
                        </TouchableOpacity>
                        <Text style={styles.qty}>{item.qty}</Text>
                        <TouchableOpacity
                          style={styles.btn}
                          onPress={() => {
                            dispatch(addItemToCart(item));
                          }}>
                          <Text style={{fontSize: 18, fontWeight: '600'}}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={styles.totalView}>
            <Text style={styles.title}>Total</Text>
            <Text style={[styles.title, {marginRight: 20}]}>
              {'$' + getTotal()}
            </Text>
          </View>
          <Text style={styles.title}>Select Payment Mode</Text>
          <TouchableOpacity
            style={styles.paymentMethods}
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
                styles.img,
                {tintColor: selectedMethod == 0 ? 'orange' : 'black'},
              ]}
            />
            <Text style={styles.paymentMethdodsTxt}>Card</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.paymentMethods}
            onPress={() => {
              setSelectedMethod(1);
            }}>
            <Image
              source={
                selectedMethod == 1
                  ? require('../images/radio_2.png')
                  : require('../images/radio_1.png')
              }
              style={[
                styles.img,
                {tintColor: selectedMethod == 1 ? 'orange' : 'black'},
              ]}
            />
            <Text style={styles.paymentMethdodsTxt}>Cash on Delivery</Text>
          </TouchableOpacity> */}
          <View style={styles.addressView}>
            <Text style={styles.title}>Address</Text>
            <Text
              style={[
                styles.title,
                {textDecorationLine: 'underline', color: '#0269A0FB'},
              ]}
              onPress={() => {
                navigation.navigate('Addresses');
              }}>
              Edit Address
            </Text>
          </View>
          <Text
            style={[
              styles.title,
              {marginTop: 10, fontSize: 16, color: '#636363'},
            ]}>
            {selectedAddress || 'Please Select Address'}
          </Text>
        </ScrollView>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 30,
    color: '#000',
  },
  scrollContainer: {
    flex: 1, // Take up all available space
    paddingBottom: 90,
  },
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  desc: {
    marginLeft: 20,
  },
  price: {
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
  },
  qtyview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    padding: 5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 10,
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
  },
  noItems: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalView: {
    width: '100%',
    justifyContent: 'space-between',

    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: '#B7B7B7',
  },
  paymentMethods: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 20,
    paddingLeft: 20,
  },
  img: {
    width: 24,
    height: 24,
  },
  paymentMethdodsTxt: {
    marginLeft: 15,
    fontSize: 16,
    color: '#000',
  },
  addressView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 20,
  },
});
