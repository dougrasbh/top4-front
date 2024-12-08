import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { formatDate } from "@/app/utils/formatDate";
import { RFValue } from "react-native-responsive-fontsize";
import BryophtaExample from "../assets/images/bryophta-example.png"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useNavigation, Link } from "expo-router";

interface HistoricalCardProps {
  image?: string;
  bryophtaName: string;
  date: Date;
}

export function HistoricalCard({ image, bryophtaName, date }: HistoricalCardProps) {

  const colorScheme = useColorScheme();
  const color = (Colors[colorScheme ?? 'light'].icon)

  const navigate = useNavigation();

  return(
    <ThemedView style={styles.container}>
      <View>
        <Image 
          style={styles.image}
          source={BryophtaExample} 
        />
      </View>
      <View style={styles.infoContainer}>
        <ThemedText 
          type="defaultSemiBold" 
          numberOfLines={3}
          ellipsizeMode="tail"  
          style={styles.bryophtaName}
        >
          {bryophtaName}
        </ThemedText>
        <ThemedText style={styles.bryophtaName} >{formatDate(date)}</ThemedText>
      </View>
      <View>
        <TouchableOpacity style={styles.button} activeOpacity={0.7} >
          <Link href={`/modal?id=1`}>
            <AntDesign name="rightcircle" size={25} color={color} />
          </Link>
        </TouchableOpacity>
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
    maxWidth: '100%',
    margin: 10,
    borderRadius: 10,
    marginBottom: 5
  },
  image: {
    width: RFValue(100),
    height: RFValue(100),
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
    width: RFValue(125),
    paddingLeft: 10,
  }
});
