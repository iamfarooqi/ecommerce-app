import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStripe} from '@stripe/stripe-react-native';
import {useDispatch} from 'react-redux';
import {orderItem} from '../redux/slices/OrderSlice';
import {emptyCart} from '../redux/slices/CartSlice';

const PaymentButton = ({
  selectedAddress,
  logInUserData,
  getTotal,
  orderPlace,
}) => {
  const navigation = useNavigation();
  const stripe = useStripe();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    try {
      setLoading(true);
      const name = logInUserData.name;
      const price = getTotal();

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
        const initSheet = await stripe.initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          merchantDisplayName: name,
        });
        if (initSheet.error) return Alert.alert(initSheet.error.message);
        const presentSheet = await stripe.presentPaymentSheet({
          clientSecret,
        });
        if (presentSheet.error) return Alert.alert(presentSheet.error.message);

        const orderData = orderPlace(clientSecret);
        dispatch(orderItem(orderData));
        dispatch(emptyCart([]));
        setLoading(false);

        navigation.navigate('OrderSuccess');
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
        <Text style={{color: '#fff'}}>
          {loading ? 'loading' : 'Pay & Order'}
        </Text>
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
    alignItems: 'center',
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
