import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import tailwind from 'twrnc';
const {height, width} = Dimensions.get('window');
const Header = ({
  title,
  leftIcon,
  rightIcon,
  onClickLeftIcon,
  onClickRightIcon,
  searchIcon,
  isCart,
}) => {
  const cartItems = useSelector(state => state.cart);

  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onClickLeftIcon();
        }}>
        {leftIcon && <Image source={leftIcon} style={styles.icon} />}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {!isCart && <View></View>}
      <View style={tailwind`flex flex-row items-center justify-between`}>
        {searchIcon && (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate('Search');
            }}>
            {searchIcon && (
              <Image
                source={searchIcon}
                style={[styles.icon, {width: 22, height: 22}]}
              />
            )}
          </TouchableOpacity>
        )}

        {isCart && (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate('Cart');
            }}>
            <Image
              source={rightIcon}
              style={[styles.icon, {width: 35, height: 35}]}
            />
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: '#fff',
                position: 'absolute',
                right: 0,
                top: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#000'}}>{cartItems.data.length}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header: {
    width: width,
    height: 65,

    backgroundColor: '#008080',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
});
