import { StyleSheet, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize"

import MapView, { Marker } from 'react-native-maps';
import { 
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
 } from 'expo-location';
import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'expo-router';
import axios from 'axios';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { Colors } from '@/constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

import { useFocusEffect } from 'expo-router';

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
  const colorScheme = useColorScheme();

  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
 
  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/Prediction/Get/All`)
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

  const color = Colors[colorScheme ?? 'light'].tint

  const logOut = async() => {
    await AsyncStorage.removeItem('id');
    router.dismissAll();
  }

  const refresh = async() => {
    await getData().then(() => setIsLoading(true));
    setIsLoading(false);
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

          <ThemedView style={{
            position: 'absolute',
            alignItems: 'center',  
            top: RFValue(60),
            left: RFValue(20),
            height: RFValue(45),
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderRadius: RFValue(30),
            width: RFValue(275),
            elevation: 5,
            flexDirection: 'row',
            justifyContent: 'space-around',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 5,  

          }}>
            <ThemedView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Entypo name="leaf" size={24} color={color} style={{marginRight: 10}} />
              <ThemedText
                style={{
                  color: color,
                  fontFamily: 'Poppins_600SemiBold',
                  fontSize: RFValue(16),
                }}
                >Bem-vindo (a)!</ThemedText>
            </ThemedView>
            <ThemedView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={refresh} style={{marginRight: 15}} >
                <Feather name="refresh-cw" size={24} color={color} />
              </TouchableOpacity>
              <TouchableOpacity onPress={logOut} >
                <AntDesign name="logout" size={24} color={color} />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
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
