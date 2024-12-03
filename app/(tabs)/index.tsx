import { StyleSheet, Platform, View, TouchableOpacity } from 'react-native';

import { Image } from 'expo-image';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MapView from 'react-native-maps';
import { 
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
 } from 'expo-location';
import { useEffect, useState } from 'react';

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

  return (
    <View style={styles.container} >
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.coords.latitude || 0,
          longitude: location?.coords.longitude || 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}

        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        >
          <TouchableOpacity style={styles.button}>
            <Image 
              style={styles.image}
              source={'../../assets/images/icon.png'} 
            />
          </TouchableOpacity>
        </MapView>
        
      {/* <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView> */}
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
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    position: 'absolute',
    bottom: 110, 
    left: 300,
    right: 20, 
    backgroundColor: '#00A86B', 
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});
