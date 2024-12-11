import { StyleSheet, Platform, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import Foundation from '@expo/vector-icons/Foundation';
import { BlurView } from 'expo-blur';
import { RFValue } from 'react-native-responsive-fontsize';

export default function CameraPage() {

  const [permission, requestPermission] = useCameraPermissions();

  const requestCameraPermissions = async() => {
    await requestPermission()
    if (!permission) {
      return;
    }
  }

  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  const takePicture = async (select: boolean) => {
    let byteArray: string;
    let image;
  
    if (select) {

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        image = result.assets[0];
      }
      
    } else if (permission) {

      image = await cameraRef.current?.takePictureAsync({
        base64: true,
        quality: 0.3,
      });
    }
    if (image) {
      const manipResult = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: 300, height: 300 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );
  
      const fileUri = Platform.OS === 'ios' ? manipResult.uri.replace('file://', '') : manipResult.uri;
      byteArray = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      router.navigate('/loading');
  
      await axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/Prediction/RequestPrediction`, {
          imageBytesInBase64: byteArray,
          userId: 1,
        })
        .then(() => router.navigate('/success'))
        .catch((error) => {
          router.navigate('/error');
          console.log(JSON.stringify(error));
        });
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
    <CameraView style={styles.camera} facing={'back'} ref={cameraRef}>
      <TouchableOpacity style={styles.button} onPress={() => takePicture(false)} activeOpacity={0.7} />
      <TouchableOpacity style={styles.pickGallery} onPress={() => takePicture(true)}>
        <Foundation name="photo" size={35} color="white" />
      </TouchableOpacity>
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
    flexDirection: 'row',
    backgroundColor: 'white',
    width: RFValue(70),
    height: RFValue(70),
    borderRadius: 1000,
    borderColor: "#BDBCBC",
    borderWidth: 6,
    left: 100,
    bottom: -630
  },
  pickGallery: {
    flexDirection: 'row',
    backgroundColor: 'rgba(121, 121, 121, 0.65)',
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: 1000,
    left: 225,
    bottom: -555,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
