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
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addItemToCart,
  emptyCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../redux/slices/CartSlice';
import CustomButton from '../common/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {orderItem} from '../redux/slices/OrderSlice';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import {STRIPE_SECRET_KEY} from '../../stripeConfig';

const Checkout = () => {
  const {confirmPayment} = useStripe();
  const navigation = useNavigation();
  const items = useSelector(state => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const isFocused = useIsFocused();
  const [selectedAddress, setSelectedAddress] = useState(
    'Please Select Address',
  );
  console.log(selectedAddress, 'selectedAddress');
  const dispatch = useDispatch();
  useEffect(() => {
    setCartItems(items.data);
  }, [items]);

  const getTotal = () => {
    let total = 0;
    cartItems.map(item => {
      total = total + item.qty * item.price;
    });
    return total.toFixed(0);
  };
  useEffect(() => {
    getSelectedAddress();
  }, [isFocused]);
  const getSelectedAddress = async () => {
    setSelectedAddress(await AsyncStorage.getItem('MY_ADDRESS'));
  };

  const orderPlace = paymentId => {
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
    dispatch(orderItem(data));
    dispatch(emptyCart([]));
    navigation.navigate('OrderSuccess');
  };

  const {stripe} = useStripe();

  const handlePayment = async () => {
    try {
      const {paymentMethod, error} = await stripe.confirmPaymentClientSecret({
        paymentMethod: {
          card: {
            number: '4242424242424242', // Test card number
            expMonth: 12, // Any future month
            expYear: 25, // Any future year
            cvc: '123', // Any 3-digit CVC code
          }, // Replace with your card element or details
        },
        paymentIntentClientSecret: STRIPE_SECRET_KEY, // Replace with your Payment Intent's client_secret
      });

      if (error) {
        console.error(error);
        // Handle payment error
      } else {
        // Payment is successful, you can use paymentMethod object
        // Call the orderPlace function or perform other actions
        orderPlace(paymentMethod.id); // Assuming orderPlace is a function to handle the order
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        title={'Checkout'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
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
                  <Image source={{uri: item.image}} style={styles.itemImage} />
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
                        <Text style={{fontSize: 18, fontWeight: '600'}}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qty}>{item.qty}</Text>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          dispatch(addItemToCart(item));
                        }}>
                        <Text style={{fontSize: 18, fontWeight: '600'}}>+</Text>
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
          <Text style={styles.paymentMethdodsTxt}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
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
          <Text style={styles.paymentMethdodsTxt}>Debit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentMethods}
          onPress={() => {
            setSelectedMethod(2);
          }}>
          <Image
            source={
              selectedMethod == 2
                ? require('../images/radio_2.png')
                : require('../images/radio_1.png')
            }
            style={[
              styles.img,
              {tintColor: selectedMethod == 2 ? 'orange' : 'black'},
            ]}
          />
          <Text style={styles.paymentMethdodsTxt}>UPI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentMethods}
          onPress={() => {
            setSelectedMethod(3);
          }}>
          <Image
            source={
              selectedMethod == 3
                ? require('../images/radio_2.png')
                : require('../images/radio_1.png')
            }
            style={[
              styles.img,
              {tintColor: selectedMethod == 3 ? 'orange' : 'black'},
            ]}
          />
          <Text style={styles.paymentMethdodsTxt}>Cash on Delivery</Text>
        </TouchableOpacity>
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
        {/* <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: 'Card Number',
            postalCode: 'ZIP Code',
          }}
        /> */}
        <CustomButton
          bg={'green'}
          title={'Pay & Order'}
          color={'#fff'}
          onClick={() => {
            handlePayment(); // Call handlePayment when the "Pay & Order" button is clicked
          }}
        />
      </ScrollView>
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
