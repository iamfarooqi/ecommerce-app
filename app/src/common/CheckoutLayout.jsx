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
      <View style={tailwind`justify-center items-center`}>
        <Text style={tailwind`text-lg`}>Total</Text>
        <Text style={tailwind`font-bold text-xl`}>{'$' + total}</Text>
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
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkout: {
    width: '80%',
    height: '60%',
    backgroundColor: '#FF8605',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  total: {fontWeight: '700', fontSize: 18},
});
