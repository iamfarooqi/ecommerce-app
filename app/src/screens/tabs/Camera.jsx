import React, {useState, useRef} from 'react';
import {RNCamera} from 'react-native-camera';
import {TouchableOpacity, Alert, StyleSheet, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import tailwind from 'twrnc';

const Camera = () => {
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [takingPic, setTakingPic] = useState(false);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);

  const takePicture = async () => {
    if (cameraRef.current && !takingPic) {
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      try {
        const {uri} = await cameraRef.current.takePictureAsync(options);
        navigation.navigate('PredictionScreen', {data: {uri}});
      } catch (err) {
        Alert.alert(
          'Error',
          'Failed to take a picture: ' + (err.message || err),
        );
      }
    }
  };

  const toggleCamera = () => {
    setCameraType(
      cameraType === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back,
    );
  };

  return (
    <View style={tailwind`flex-1`}>
      <RNCamera
        ref={cameraRef}
        captureAudio={false}
        style={{flex: 1}}
        type={cameraType} // Set the camera type here
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <View style={tailwind`p-2 flex flex-row justify-between m-2`}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate('Main');
            }}>
            <Image
              source={require('../../images/clear.png')}
              style={tailwind`w-5 h-5`}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleCamera}>
            <Image
              source={require('../../images/switch-camera.png')}
              style={styles.toggleCameraImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.cameraButtonContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={takePicture}
            style={styles.cameraButton}>
            <Image
              source={require('../../images/camera_fill.png')}
              style={styles.cameraButtonImage}
            />
          </TouchableOpacity>
        </View>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  cameraButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 15,
  },
  cameraButtonImage: {
    width: 30,
    height: 30,
  },
  toggleCameraButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  toggleCameraImage: {
    width: 30,
    height: 30,
  },
});

export default Camera;
