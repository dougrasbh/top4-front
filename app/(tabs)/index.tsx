import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize"
import { useNavigation } from 'expo-router';

import { Image } from 'expo-image';

import MapView from 'react-native-maps';
import { 
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
 } from 'expo-location';
import { useEffect, useState } from 'react';

import CameraLogo from '../../assets/images/camera-logo.png'

export default function HomeScreen() {

  const [location, setLocation] = useState<LocationObject | null>(null);

  const navigation = useNavigation()

  const requestLocationPermissions = async() => {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions()
  }, [])

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      setLocation(response);
    })
  }, [])

  return (
    <View style={styles.container} >

      {location && (
         <MapView
         style={styles.map}
         initialRegion={{
           latitude: location.coords.latitude,
           longitude: location.coords.longitude,
           latitudeDelta: 0.005,
           longitudeDelta: 0.005,
         }}
 
         showsUserLocation={true}
         showsMyLocationButton={true}
         showsCompass={true}
       />
      )}
     
      
        {/* <View style={styles.footer}>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => navigation.navigate('camera')} >
            <Image 
              style={styles.image}
              source={CameraLogo} 
            />
          </TouchableOpacity>
        </View> */}
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    width: RFValue(60),
    height: RFValue(60),
    backgroundColor: '#00A86B',
    borderRadius: RFValue(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: RFValue(450),
    padding: RFValue(20), 
    backgroundColor: 'transparent', 
  },
  image: {
    width: RFValue(30),
    height: RFValue(30),
  },
  camera: {
    flex: 1,
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
