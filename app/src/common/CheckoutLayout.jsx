import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import tailwind from 'twrnc';

const CheckoutLayout = ({total, items}) => {
  const navigation = useNavigation();
  return (
    <View
      style={tailwind`absolute bottom-0 h-20 px-2 w-full bg-white flex flex-row justify-between`}>
      <View style={tailwind`justify-center`}>
        <Text style={tailwind`text-lg`}>TOTAL</Text>
        <Text style={tailwind`font-bold text-xl text-black`}>
          {'$' + total}
        </Text>
      </View>
      <View style={tailwind`justify-center items-center`}>
        <TouchableOpacity
          style={tailwind`px-3 py-2 rounded-full bg-[#008080] flex flex-row justify-center items-center`}
          onPress={() => {
            navigation.navigate('Checkout');
          }}>
          <Text style={tailwind`text-white text-lg`}>Checkout</Text>
          <View style={tailwind`rounded-full p-1.5 ml-3 bg-white`}>
            <Image
              source={require('../images/next.png')}
              style={tailwind`w-4 h-4`}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutLayout;

