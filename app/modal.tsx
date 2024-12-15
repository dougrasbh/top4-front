import { View, Image, Platform, StyleSheet, Linking, TouchableOpacity, ActivityIndicator } from "react-native";
import BryophtaExample from "../assets/images/musgoExemplo.jpg"
import { RFValue } from "react-native-responsive-fontsize";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link, useLocalSearchParams } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { formatDate } from "./utils/formatDate";
import { useEffect, useState } from "react";
import axios from "axios";
import { convertToDMS } from "./utils/convertToDMS";

interface Data {
  category: number;
  points: number;
  latitude: number;
  longitude: number;
  imageBytes: string;
  creationTime: string;
}

export default function VisualizeBryophta() {

  const { id } = useLocalSearchParams();

  const [data, setData] = useState<Data>();
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/Prediction/${id}`)
      setData(response.data)
    } catch (e) {
      console.error('Erro ao ler os dados:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function openMap(latitude: number, longitude: number) {
    const location = `${latitude},${longitude}`
    const url = Platform.select({
      ios: `googleMaps://?center=${latitude},${longitude}&q=${latitude},${longitude}&zoom=14&views=traffic`,
      android: `geo:${location}?center=${location}&q=${location}&z=16`,
    }) || "";
    Linking.openURL(url);
  }

  if (isLoading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00A86B"  />
      </ThemedView>
    );
  }

  return(
    <ThemedView style={styles.container}>
      <ThemedText 
        type="defaultSemiBold" 
        numberOfLines={3}
        ellipsizeMode="tail"  
        style={styles.bryophtaName} 
        >
          {data?.category == 3 ? "Musgo" : data?.category == 2 ? "Hepática" : "Antócero"}
        </ThemedText>
      <View>
        <Image 
          style={styles.image}
          source={{ uri: `data:image/jpeg;base64,${data?.imageBytes}` }}
        />
      </View>
      <ThemedView style={styles.infoContainer} >
       <ThemedView style={styles.card} lightColor='#FAFAFA' darkColor="#1a1a1a">
        <View style={styles.circle}>
          <MaterialCommunityIcons name="calendar-clock-outline" size={30} color="white" />
        </View>
        <ThemedText style={styles.cardInfo}>{formatDate(data?.creationTime ? new Date(data?.creationTime) : new Date())}</ThemedText>
       </ThemedView>

       <ThemedView style={styles.card} lightColor='#FAFAFA' darkColor="#1a1a1a">
        <TouchableOpacity style={styles.buttonMap}  onPress={() => openMap(data?.latitude || 0, data?.longitude || 0)}>
          <View style={styles.circle}>
            <Ionicons name="location-outline" size={30} color="white"/>
          </View>
          <ThemedText style={styles.locationInfo}>{convertToDMS(data?.latitude || 0, data?.longitude || 0)}</ThemedText>
        </TouchableOpacity>
       </ThemedView>
       <ThemedView style={styles.card} lightColor='#FAFAFA' darkColor="#1a1a1a">
        <View style={styles.circle}>
          <AntDesign name="Trophy" size={30} color="white" />
        </View>
        <ThemedText style={styles.cardInfo}>{data?.points} pontos</ThemedText>
       </ThemedView>
      </ThemedView>

      <TouchableOpacity activeOpacity={0.7}>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
