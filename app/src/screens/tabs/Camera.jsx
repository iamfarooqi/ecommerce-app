import React, {useState, useRef} from 'react';
import {RNCamera} from 'react-native-camera';
import {TouchableOpacity, Alert, StyleSheet, View, Image} from 'react-native';

const Camera = () => {
  const [takingPic, setTakingPic] = useState(false);
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current && !takingPic) {
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      setTakingPic(true);

      try {
        const data = await cameraRef.current.takePictureAsync(options);
        Alert.alert('Success', JSON.stringify(data));
      } catch (err) {
        Alert.alert(
          'Error',
          'Failed to take a picture: ' + (err.message || err),
        );
      } finally {
        setTakingPic(false);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={cameraRef}
        captureAudio={false}
        style={{flex: 1}}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
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
    bottom: 20, // Adjust the value as needed for your layout
    alignSelf: 'center', // Center horizontally
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
});

export default Camera;
