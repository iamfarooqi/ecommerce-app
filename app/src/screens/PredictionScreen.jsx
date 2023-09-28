import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';

export default function PredictionScreen({route}) {
  const navigation = useNavigation();
  const {data} = route.params;

  return (
    <View style={styles.container}>
      <Header
        title={'Result'}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.heading}>Prediction Result</Text>
      {data && data.uri ? (
        <Image source={{uri: data.uri}} style={styles.image} />
      ) : (
        <Text>No image available</Text>
      )}
      <Text style={styles.className}>Class Name: ... </Text>
      <Text style={styles.confidence}>Confidence Score: ...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Background color
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 300, // Adjust the image width
    height: 300, // Adjust the image height
    borderRadius: 10, // Optional: Add rounded corners to the image
  },
  className: {
    fontSize: 18,
    marginTop: 20,
  },
  confidence: {
    fontSize: 16,
    marginTop: 10,
  },
});
