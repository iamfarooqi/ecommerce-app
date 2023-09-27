import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../common/CustomButton';
import {useDispatch} from 'react-redux';
import {addItemToWishList} from '../redux/slices/WishlistSlice';
import {addItemToCart} from '../redux/slices/CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AskForLoginModal from '../common/AskForLoginModal';
import tailwind from 'twrnc';
const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const checkUserStatus = async () => {
    let isUserLoggedIn = false;
    const status = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
    console.log(status);
    if (status == null) {
      isUserLoggedIn = false;
    } else {
      isUserLoggedIn = true;
    }
    console.log(isUserLoggedIn);
    return isUserLoggedIn;
  };
  const handleAddToCart = async () => {
    const isUserLoggedIn = await checkUserStatus();
    if (isUserLoggedIn) {
      console.log('User is logged in');
      // Add item to cart through Redux
      dispatch(
        addItemToCart({
          category: route.params.data.category,
          description: route.params.data.description,
          id: route.params.data.id,
          image: route.params.data.image,
          price: route.params.data.price,
          qty: qty,
          rating: route.params.data.rating,
          title: route.params.data.title,
        }),
      );
    } else {
      console.log('User is not logged in');
      setModalVisible(true);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        rightIcon={require('../images/cart.png')}
        title={'Product Detail'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isCart={true}
      />

      <ScrollView>
        <View style={tailwind`p-2 mx-auto`}>
          <View style={tailwind`w-82 h-82 mx-auto`}>
            <Image
              style={tailwind`p-5 h-full w-full`}
              source={{uri: route.params.data.image}}
            />
          </View>

          <Text style={tailwind`text-3xl my-3`}>
            {route.params.data.title.length > 20
              ? route.params.data.title.substring(0, 20) + '...'
              : route.params.data.title}
          </Text>
          <Text>
            {route.params.data.description.length > 100
              ? route.params.data.description.substring(0, 100) + '...'
              : route.params.data.description}
          </Text>
          <View
            style={tailwind`flex flex-row items-center justify-between my-3`}>
            <Text style={tailwind`font-semibold text-xl`}>
              {'$' + route.params.data.price}
            </Text>
            <View>
              <Text style={tailwind`font-semibold text-xl text-green-500`}>
                50% OFF
              </Text>
            </View>
          </View>
          <View
            style={tailwind`flex flex-row items-center justify-between my-3`}>
            <Text style={tailwind`font-semibold text-lg`}>Select Quantity</Text>
            <View style={tailwind`flex flex-row items-center`}>
              <TouchableOpacity
                style={tailwind`border w-6 h-6 flex items-center justify-center rounded-full`}
                onPress={() => {
                  if (qty > 1) {
                    setQty(qty - 1);
                  }
                }}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={tailwind`mx-2`}>{qty}</Text>
              <TouchableOpacity
                style={tailwind`border w-6 h-6 flex items-center justify-center rounded-full`}
                onPress={() => {
                  setQty(qty + 1);
                }}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.wishlistBtn}
            onPress={() => {
              if (checkUserStatus()) {
                dispatch(addItemToWishList(route.params.data));
              } else {
                setModalVisible(true);
              }
            }}>
            <Image
              source={require('../images/wishlist.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <CustomButton
            bg={'#FC2E20'}
            title={'Add To Cart'}
            color={'#fff'}
            onClick={handleAddToCart}
          />
        </View>
      </ScrollView>
      <AskForLoginModal
        modalVisible={modalVisible}
        onClickLogin={() => {
          setModalVisible(false);
          navigation.navigate('Login');
        }}
        onClose={() => {
          setModalVisible(false);
        }}
        onClickSignup={() => {
          setModalVisible(false);
          navigation.navigate('Signup');
        }}
      />
    </View>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: 300,
    resizeMode: 'center',
  },
  title: {
    fontSize: 23,
    color: '#000',
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
  },
  desc: {
    fontSize: 16,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  price: {
    color: 'green',
    marginLeft: 20,
    marginTop: 20,
    fontSize: 20,
    fontWeight: '800',
  },
  wishlistBtn: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: '#E2DFDF',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icon: {
    width: 24,
    height: 24,
  },
  qtyView: {},
  btn: {
    padding: 3,
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
});
