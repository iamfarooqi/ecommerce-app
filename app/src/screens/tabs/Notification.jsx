import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../../common/Header';

const Notification = () => {
  return (
    <View>
      <Header title={'Notification'} />

      <View style={styles.noItems}>
        <Text>No Notification</Text>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  noItems: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
