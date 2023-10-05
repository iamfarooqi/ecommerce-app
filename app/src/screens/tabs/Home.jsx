import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addProducts} from '../../redux/slices/ProductsSlice';
import tailwind from 'twrnc';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        json.map(item => {
          item.qty = 1;
        });
        dispatch(addProducts(json));
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={tailwind`flex-1`}>
      <Header
        leftIcon={require('../../images/menu.png')}
        rightIcon={require('../../images/cart.png')}
        searchIcon={require('../../images/search.png')}
        title={'Home'}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
        isCart={true}
      />
      <View style={tailwind`flex flex-row justify-between mt-2`}>
        <FlatList
          key={2}
          data={products}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={1}
              style={tailwind`mr-1 ml-2 my-2`}
              onPress={() => {
                navigation.navigate('ProductDetail', {data: item});
              }}>
              <View style={tailwind`w-48 overflow-hidden rounded-lg bg-white`}>
                <View style={tailwind`h-40 w-full`}>
                  <Image
                    style={tailwind`h-full w-full object-cover`}
                    source={{uri: item.image}}
                    alt="Product Image"
                  />
                </View>
                <View style={tailwind`px-2`}>
                  <Text style={tailwind`text-lg font-medium text-gray-900`}>
                    {item.title.length > 15
                      ? item.title.substring(0, 15) + '...'
                      : item.title}
                  </Text>
                  <Text style={tailwind`text-base text-gray-700`}>
                    {item.description.length > 15
                      ? item.description.substring(0, 15) + '...'
                      : item.description}
                  </Text>
                  <View style={tailwind`flex flex-row justify-between`}>
                    <View style={tailwind``}>
                      <Text
                        style={tailwind`text-lg font-semibold text-gray-900`}>
                        {'$' + item.price}
                      </Text>
                    </View>
                    <View style={tailwind`flex`}>
                      <Text
                        style={tailwind`text-base font-medium text-gray-500`}>
                        {'MRP' + ' $40'}
                      </Text>
                      <Text
                        style={tailwind`text-base font-medium text-green-500`}>
                        40% OFF
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default Home;
