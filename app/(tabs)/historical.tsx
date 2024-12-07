import { HistoricalCard } from '@/components/HistoricalCard';
import { StyleSheet, ScrollView } from 'react-native';

export default function Historical() {
  return (
    <ScrollView>
      <HistoricalCard 
        bryophtaName='Syrrhopodon ligulatusaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        date={new Date()}
      />
      <HistoricalCard 
        bryophtaName='Syrrhopodon ligulatus'
        date={new Date()}
      />
    </ScrollView>
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
});
