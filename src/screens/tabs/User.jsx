import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import Header from '../../common/Header';

const User = () => {
  return (
    <View style={styles.container}>
      <Header title={'Profile'} />
      <Image
        source={require('../../images/default_user.png')}
        style={styles.user}
      />
      <Text style={styles.name}>User</Text>
    </View>
  );
};

export default User;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  user: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
  },
  name: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  tab: {
    width: '90%',
    height: 50,
    borderBottomWidth: 0.3,
    alignSelf: 'center',
    borderBottomColor: '#DBDBDB',
    paddingLeft: 20,
    justifyContent: 'center',
  },
  txt: {
    color: '#000',
  },
});
