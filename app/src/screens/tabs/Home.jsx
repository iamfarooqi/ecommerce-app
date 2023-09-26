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

  const data = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Product description',
      price: '$20.00',
      discountPrice: '$25.00',
      discount: '20% off',
      imageUrl:
        'https://images.unsplash.com/photo-1659019479940-e3fd3fba24d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Product description',
      price: '$30.00',
      discountPrice: '$35.00',
      discount: '15% off',
      imageUrl:
        'https://images.unsplash.com/photo-1659019479940-e3fd3fba24d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: '3',
      name: 'Product 3',
      description: 'Product description',
      price: '$30.00',
      discountPrice: '$35.00',
      discount: '15% off',
      imageUrl:
        'https://images.unsplash.com/photo-1659019479940-e3fd3fba24d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: '4',
      name: 'Product 4',
      description: 'Product description',
      price: '$30.00',
      discountPrice: '$35.00',
      discount: '15% off',
      imageUrl:
        'https://images.unsplash.com/photo-1659019479940-e3fd3fba24d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: '5',
      name: 'Product 5',
      description: 'Product description',
      price: '$30.00',
      discountPrice: '$35.00',
      discount: '15% off',
      imageUrl:
        'https://images.unsplash.com/photo-1659019479940-e3fd3fba24d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: '6',
      name: 'Product 6',
      description: 'Product description',
      price: '$30.00',
      discountPrice: '$35.00',
      discount: '15% off',
      imageUrl:
        'https://images.unsplash.com/photo-1659019479940-e3fd3fba24d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    // Add more data objects for additional cards
  ];
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
});
