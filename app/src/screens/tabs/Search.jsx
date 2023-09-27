import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';
import tailwind from 'twrnc';

const Search = () => {
  const navigation = useNavigation();
  const products = useSelector(state => state);

  const [search, setSearch] = useState('');
  const [searchedList, setSearchedList] = useState(products.product.data);

  const filterData = txt => {
    let newData = products.product.data.filter(item => {
      return item.title.toLowerCase().match(txt.toLowerCase());
    });
    setSearchedList(newData);
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Search Items'}
        leftIcon={require('../../images/back.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.searchView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../images/search.png')}
            style={styles.icon}
          />
          <TextInput
            value={search}
            onChangeText={txt => {
              setSearch(txt);
              filterData(txt);
            }}
            placeholder="Search items here..."
            style={styles.input}
          />
        </View>
        {search !== '' && (
          <TouchableOpacity
            style={[
              styles.icon,
              {justifyContent: 'center', alignItems: 'center'},
            ]}
            onPress={() => {
              setSearch('');
              filterData('');
            }}>
            <Image
              source={require('../../images/clear.png')}
              style={[styles.icon, {width: 16, height: 16}]}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={tailwind`flex flex-row justify-between mt-2`}>
        <FlatList
          key={2}
          data={searchedList}
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

export default Search;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchView: {
    width: '90%',
    height: 50,
    borderRadius: 20,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'center',
  },
  input: {width: '80%', marginLeft: 10},
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
