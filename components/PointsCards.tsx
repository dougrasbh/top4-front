import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { formatDate } from "@/app/utils/formatDate";
import { RFValue } from "react-native-responsive-fontsize";
import Trophy from "../assets/images/trophy.png"

interface Props {
  points: number;
  date: Date;
}

export function PointsCards({ points, date}: Props) {

  return(
    <ThemedView style={styles.container}>
      <View>
        <Image 
          style={styles.image}
          source={Trophy}
        />
      </View>
      <View style={styles.infoContainer}>
        <ThemedText 
          type="subtitle" 
          numberOfLines={3}
          ellipsizeMode="tail"  
          style={styles.bryophtaName}
        >
          +{points} pontos
        </ThemedText>
        <ThemedText style={styles.bryophtaName} >{formatDate(date)}</ThemedText>
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '70%',
    margin: 10,
    borderRadius: 10,
    marginBottom: 5
  },
  image: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(7),
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bryophtaName: {
    flexWrap: 'wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    alignItems: 'center',
    width: RFValue(160),
    paddingLeft: 30,
  }
});
