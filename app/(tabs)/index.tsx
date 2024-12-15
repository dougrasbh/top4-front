import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize"

import MapView, { Marker } from 'react-native-maps';
import { 
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
 } from 'expo-location';
import { useEffect, useState } from 'react';

import { useRouter } from 'expo-router';
import axios from 'axios';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {

  const [location, setLocation] = useState<LocationObject | null>(null);

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

  const router = useRouter();

  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
 
  const getData = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/Prediction/Get/${id}`)
      setImages(response.data)
    } catch (e) {
      console.error('Erro ao ler os dados:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#00A86B"  />
      </ThemedView>
    );
  }

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
        >

          {images.length > 0 ? (
            images.map((item, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                onPress={() => router.push(`/modal?id=${item.id}`)}
              >
                <Image 
                  source={{ uri: `data:image/jpeg;base64,${item.imageBytes}` }}
                  style={styles.imageMarker}
                />
              </Marker>
            ))
          ) : (
            <ThemedText>Nenhum dado encontrado</ThemedText>
          )}
        </MapView>
      )}
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
  imageMarker: {
    width: RFValue(50),
    height: RFValue(50),
    resizeMode: 'contain',
    borderRadius: 30,
    borderColor: '#00A86B',
    borderWidth: 3,
  }
});
