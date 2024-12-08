import { View, Image, Platform, StyleSheet, Linking, TouchableOpacity } from "react-native";
import BryophtaExample from "../assets/images/bryophta-example.png"
import { RFValue } from "react-native-responsive-fontsize";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link, useLocalSearchParams, router } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { formatDate } from "./utils/formatDate";

interface Props {
  image?: any;
  bryophtaName: string;
  date: Date;
  location: string;
  points: number;
}

export default function VisualizeBryophta({ image, bryophtaName, date, location, points }: Props) {

  const { id } = useLocalSearchParams();

  console.log(id)

  function openMap(latitude: number = -3.03, longitude: number = -60.01) {
    const location = `${latitude},${longitude}`
    const url = Platform.select({
      ios: `googleMaps://?center=${latitude},${longitude}&q=${latitude},${longitude}&zoom=14&views=traffic`,
      android: `geo:${location}?center=${location}&q=${location}&z=16`,
    }) || "";
    Linking.openURL(url);
  }

  return(
    <ThemedView style={styles.container}>
      <ThemedText 
          type="defaultSemiBold" 
          numberOfLines={3}
          ellipsizeMode="tail"  
          style={styles.bryophtaName}
        >
          Syrrhopodon ligulatus
        </ThemedText>
      <View>
        <Image 
          style={styles.image}
          source={BryophtaExample} 
        />
      </View>
      <ThemedView style={styles.infoContainer} >
       <ThemedView style={styles.card} lightColor='#FAFAFA' darkColor="#1a1a1a">
        <View style={styles.circle}>
          <MaterialCommunityIcons name="calendar-clock-outline" size={30} color="white" />
        </View>
        <ThemedText style={styles.cardInfo}>{formatDate(new Date())}</ThemedText>
       </ThemedView>

       <ThemedView style={styles.card} lightColor='#FAFAFA' darkColor="#1a1a1a">
        <TouchableOpacity style={styles.buttonMap}  onPress={() => openMap()}>
          <View style={styles.circle}>
            <Ionicons name="location-outline" size={30} color="white"/>
          </View>
          <ThemedText style={styles.locationInfo}>3.03° S, 60.01° W</ThemedText>
        </TouchableOpacity>
       </ThemedView>

       <ThemedView style={styles.card} lightColor='#FAFAFA' darkColor="#1a1a1a">
        <View style={styles.circle}>
          <AntDesign name="Trophy" size={30} color="white" />
        </View>
        <ThemedText style={styles.cardInfo}>10 pontos</ThemedText>
       </ThemedView>

      </ThemedView>

      <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
        <Link href={'../'}>
          <AntDesign name="closecircle" size={60} color="#00A86B" /> 
        </Link>
      </TouchableOpacity>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  image: {
    width: wp('80%'),
    height: hp('30%'),
    borderRadius: RFValue(7),
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: hp('30%'),
    maxWidth: wp('100%'),
    marginTop: RFValue(15),
  },
  bryophtaName: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        marginBottom: RFValue(20),
        marginTop: RFValue(30)
      },
      default: {
        marginBottom: RFValue(20),
        marginTop: RFValue(45)
      },
    }),
  },
  circle: {
    borderRadius: 1000,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00A86B',
  },
  card: {
    flex: 1,
    width: RFValue(190),
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
    textDecorationLine: 'underline',
    paddingLeft: RFValue(7.5)
  },
  cardInfo: {
    marginLeft: 20,
  },
  locationInfo: {
    marginLeft: 20,
    textDecorationLine: 'underline',
  },
  buttonMap: {
    flex: 1,
    width: RFValue(190),
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textDecorationLine: 'underline',
  }

});
