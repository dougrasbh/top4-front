import { StyleSheet, View, Text, Image, Platform, TouchableOpacity, Alert } from 'react-native';
import { CameraView, CameraType, Camera, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';


export default function CameraPage() {

  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState<any>(null);

  const requestCameraPermissions = async() => {
    await requestPermission()
    if (!permission) {
      return;
    }
  }

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      //setPhotoUri(photo.uri);
      Alert.alert("Photo captured!", `Photo URI: ${photo.uri}`);
    }
  };

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      // setPhotoUri(result.assets[0].uri);
      // setFilename(result.assets[0].fileName!);

      console.log(result.assets[0].uri)
      console.log(result.assets[0].fileName)
    }
  };

  const navigation = useNavigation()

  useEffect(() => {
    requestCameraPermissions();
  }, [])


  return (
    <CameraView style={styles.camera} facing={'back'}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  camera: {
    flex: 1,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
