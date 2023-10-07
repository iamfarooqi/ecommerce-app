import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../common/Header';
import {useSelector} from 'react-redux';
import tailwind from 'twrnc';

const Orders = ({navigation}) => {
  const ordersList = useSelector(state => state.order);

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <Header
        leftIcon={require('../images/back.png')}
        title={'Orders'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={ordersList.data}
        renderItem={({item, index}) => {
          return (
            <View style={tailwind`border rounded-lg mt-4 mx-2`}>
              <FlatList
                data={item.items}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={tailwind`w-full flex flex-row mb-1 overflow-hidden rounded-lg bg-white mx-auto p-2`}>
                      <View style={tailwind`w-20 h-20`}>
                        <Image
                          source={{uri: item.image}}
                          style={tailwind`w-full h-full`}
                        />
                        <Text style={tailwind`mt-1 text-black`}>
                          20 Dec 2020
                        </Text>
                      </View>

                      <View style={tailwind`px-2 w-[80%]`}>
                        <View style={tailwind`w-full flex flex-col`}>
                          <Text style={tailwind`text-lg font-bold text-black`}>
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

                        <View
                          style={tailwind`w-full flex flex-row items-center justify-between`}>
                          <Text style={tailwind`font-semibold text-lg`}>
                            Order ID: h4jks8
                          </Text>
                          <View style={tailwind`flex flex-row items-center`}>
                            <Text style={tailwind`text-lg`}>$300</Text>
                          </View>
                        </View>
                        <View
                          style={tailwind`w-full flex flex-row items-center justify-between`}>
                          <Text style={tailwind`font-semibold text-lg`}>
                            {'$' + item.price}
                          </Text>
                          <View style={tailwind`flex flex-row items-center`}>
                            <TouchableOpacity
                              style={tailwind`border px-4 py-1 bg-gray-700 flex items-center justify-center rounded-full`}>
                              <Text style={tailwind`text-white`}>Track</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Orders;
