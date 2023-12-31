import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStripe} from '@stripe/stripe-react-native';
import {useDispatch} from 'react-redux';
import {orderItem} from '../redux/slices/OrderSlice';
import {emptyCart} from '../redux/slices/CartSlice';
import tailwind from 'twrnc';




const PaymentButton = ({
  selectedAddress,
  logInUserData,
  getTotal,
  orderPlace,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const stripe = useStripe();

  const [loading, setLoading] = useState(false);

  const pay = async () => {
    try {
      setLoading(true);
      const name = logInUserData.name;
      const price = getTotal();

      console.log(logInUserData, selectedAddress, price, '>>');
      selectedAddress = JSON.stringify(selectedAddress);
      if (name && price) {
        const response = await fetch(
          'https://ecommerce-app-server-sooty.vercel.app/pay',
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

        navigation.navigate('OrderSuccess');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Something went wrong, try again later!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={tailwind`w-96 py-3 rounded-full bg-[#008080] flex flex-row justify-center items-center`}
        onPress={() => {
          pay();
        }}>
        <Text style={tailwind`text-lg font-bold text-white`}>
          {loading ? 'Loading' : 'Pay now $' + getTotal()}
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
