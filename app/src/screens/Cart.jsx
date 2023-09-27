import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../redux/slices/CartSlice';
import CheckoutLayout from '../common/CheckoutLayout';
import tailwind from 'twrnc';

const Cart = () => {
  const navigation = useNavigation();
  const items = useSelector(state => state.cart);

  const [cartItems, setCartItems] = useState([]);

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
  return (
    <View style={styles.container}>
      <Header
        title={'Your Cart'}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <View
        style={tailwind`w-full flex flex-row items-center justify-between transform overflow-hidden bg-white mx-auto p-2 py-3`}>
        <View style={tailwind``}>
          <Text>{cartItems && cartItems.length} Items in your cart</Text>
        </View>
        <View style={tailwind``}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Main');
            }}>
            <Text>+ Add more Items</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={cartItems}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              style={tailwind``}
              onPress={() => {
                navigation.navigate('ProductDetail', {data: item});
              }}>
              <View
                style={tailwind`w-full flex flex-row items-center mb-1 transform overflow-hidden rounded-lg bg-white mx-auto p-2`}>
                <View style={tailwind`w-20 h-20`}>
                  <Image
                    source={{uri: item.image}}
                    style={tailwind`w-full h-full`}
                  />
                </View>

                <View style={tailwind`px-2 w-[80%]`}>
                  <View
                    style={tailwind`w-full flex flex-row items-center justify-between`}>
                    <View style={tailwind``}>
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
                    </View>
                    <View style={tailwind``}>
                      <Image
                        source={require('../images/delete.png')}
                        style={tailwind`w-4 h-4`}
                      />
                    </View>
                  </View>

                  <View
                    style={tailwind`w-full flex flex-row items-center justify-between mt-2`}>
                    <Text style={tailwind`font-semibold text-lg`}>
                      {'$' + item.price}
                    </Text>
                    <View style={tailwind`flex flex-row items-center`}>
                      <TouchableOpacity
                        style={tailwind`border w-6 h-6 flex items-center justify-center rounded-full`}
                        onPress={() => {
                          if (item.qty > 1) {
                            dispatch(reduceItemFromCart(item));
                          } else {
                            dispatch(removeItemFromCart(index));
                          }
                        }}>
                        <Text>-</Text>
                      </TouchableOpacity>
                      <Text style={tailwind`mx-2`}>{item.qty}</Text>
                      <TouchableOpacity
                        style={tailwind`border w-6 h-6 flex items-center justify-center rounded-full`}
                        onPress={() => {
                          dispatch(addItemToCart(item));
                        }}>
                        <Text>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {cartItems.length < 1 && (
        <View style={styles.noItems}>
          <Text>No Items in Cart</Text>
        </View>
      )}
      {cartItems.length > 0 && (
        <CheckoutLayout items={cartItems.length} total={getTotal()} />
      )}
    </View>
  );
};

export default Cart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff',
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
  },
  desc: {},
  price: {
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
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
});
