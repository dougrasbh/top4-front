import { HistoricalCard } from '@/components/HistoricalCard';
import { StyleSheet, ScrollView, ActivityIndicator, RefreshControl, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import axios from 'axios';
import { ThemedView } from '@/components/ThemedView';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Historical() {
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
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/Prediction/Get/${id}`);
      setImages(response.data);
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
      {images.length > 0 ? (
        images.reverse().map((item, index) => (
          <HistoricalCard
            key={index}
            image={item.imageBytes}
            bryophtaName={item.category == 3 ? "Musgo" : item.category == 2 ? "Hepática" : "Antócero"}
            date={new Date(item.creationTime)}
            predictionId={item.id}
          />
        ))
      ) : (
        <View style={styles.loadingContainer}>
          <ThemedText style={{marginTop: RFValue(10)}}>Nenhum dado encontrado</ThemedText>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
