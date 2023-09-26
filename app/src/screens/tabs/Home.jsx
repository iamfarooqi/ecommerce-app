import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addProducts} from '../../redux/slices/ProductsSlice';
import tailwind from 'twrnc';

const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  }, []);
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

  return (
    <View style={styles.container}>
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
              <View
                style={tailwind`w-48 transform overflow-hidden rounded-lg bg-white`}>
                <Image
                  style={tailwind`h-34 w-full object-cover object-center`}
                  source={{uri: item.image}}
                  alt="Product Image"
                />
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
                        {'$' + item.price}
                      </Text>
                      <Text
                        style={tailwind`text-base font-medium text-green-500`}>
                        {'$' + item.price}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
