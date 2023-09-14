import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStripe} from '@stripe/stripe-react-native';
import {useDispatch} from 'react-redux';
import {orderItem} from '../redux/slices/OrderSlice';
import {emptyCart} from '../redux/slices/CartSlice';

const PaymentButton = ({selectedAddress, logInUserData}) => {
  const navigation = useNavigation();
  const stripe = useStripe();
  const dispatch = useDispatch();

  const pay = async () => {
    console.log('clicked');
    try {
      // sending request
      const name = logInUserData.name;
      const price = 90;

      if (name && price) {
        const response = await fetch(
          'https://ecommerce-app-server-83r5axsov-iamfarooqi.vercel.app/pay',
          {
            method: 'POST',
            body: JSON.stringify({logInUserData, selectedAddress, price}),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();
        if (!response.ok) return Alert.alert(data.message);
        const clientSecret = data.clientSecret;
        console.log(name, 'name>>');
        const initSheet = await stripe.initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          merchantDisplayName: name,
        });
        console.log(initSheet, 'initSheet>');
        if (initSheet.error) return Alert.alert(initSheet.error.message);
        const presentSheet = await stripe.presentPaymentSheet({
          clientSecret,
        });
        if (presentSheet.error) return Alert.alert(presentSheet.error.message);
        Alert.alert('Payment complete, thank you!');
        dispatch(orderItem(data));
        dispatch(emptyCart([]));
        navigation.navigate('Main');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Something went wrong, try again later!');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkout}
        onPress={() => {
          pay();
        }}>
        <Text style={{color: '#fff'}}>Pay & Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentButton;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkout: {
    width: '80%',
    height: '60%',
    backgroundColor: 'green',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
