import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';
import tailwind from 'twrnc';

const Wishlist = () => {
  const navigation = useNavigation();
  const items = useSelector(state => state.wishlist);
  const [wishlistItems, setWishlistItems] = useState(items.data);

  return (
    <View style={styles.container}>
      <Header title={'Wishlist Items'} />
      {/* <FlatList
        data={wishlistItems}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.productItem}
              onPress={() => {
                navigation.navigate('ProductDetail', {data: item});
              }}>
              <Image source={{uri: item.image}} style={styles.itemImage} />
              <View>
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
                <Text style={styles.price}>{'$' + item.price}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      /> */}
      <FlatList
        data={wishlistItems}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
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
                    <View>
                      <Text style={tailwind`text-lg font-bold`}>
                        {item.title.length > 25
                          ? item.title.substring(0, 25) + '...'
                          : item.title}
                      </Text>
                      <Text>
                        {item.description.length > 30
                          ? item.description.substring(0, 30) + '...'
                          : item.description}
                      </Text>
                    </View>
                    <View>
                      <Image
                        source={require('../../images/delete.png')}
                        style={tailwind`w-4 h-4`}
                      />
                    </View>
                  </View>

                  <View
                    style={tailwind`w-full flex flex-row items-center justify-between mt-2`}>
                    <Text style={tailwind`font-semibold text-lg`}>
                      {'$' + item.price}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {wishlistItems.length < 1 && (
        <View style={styles.noItems}>
          <Text>No Items in Wish List</Text>
        </View>
      )}
    </View>
  );
};

export default Wishlist;
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
  noItems: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
