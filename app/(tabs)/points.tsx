import { HistoricalCard } from '@/components/HistoricalCard';
import { StyleSheet, ScrollView, Text, View, ActivityIndicator, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import axios from 'axios';
import { ThemedView } from '@/components/ThemedView';
import { PointsCards } from '@/components/PointsCards';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Points() {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00A86B"  />
      </ThemedView>
    );
  }

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <ThemedView style={styles.container} lightColor='#FAFAFA' darkColor="#1a1a1a">
        {images.length > 0 ? (
          images.reverse().map((item, index) => (
            <PointsCards
              key={index}
              points={item.points}
              date={new Date(item.creationTime)}
            />
          ))
        ) : (
          <View style={styles.loadingContainer}>
            <ThemedText style={{marginTop: RFValue(10)}}>Nenhum dado encontrado</ThemedText>
          </View>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
