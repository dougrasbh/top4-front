import { SafeAreaView, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import AntDesign from '@expo/vector-icons/AntDesign';
import { RFValue } from "react-native-responsive-fontsize";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function ErrorScreen() {
  const router = useRouter();

  const colorScheme = useColorScheme();
  const color = (Colors[colorScheme ?? 'light'].background)
  
  return(
    <SafeAreaView style={{flex: 1, backgroundColor: color }}>
      <ThemedView style={styles.close}>
        <TouchableOpacity onPress={() => {
          router.dismissAll();
          router.push('/camera')
        }}>
          <AntDesign name="closecircle" size={60} color="#00A86B" /> 
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.text} type="title" >
          Erro!
        </ThemedText>
        <ThemedText style={styles.text}>
          Não foi possível identificar a briófita.{`\n`}
          Tente novamente.
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: RFValue(5)
  },
  close: {
    marginLeft: RFValue(25)
  }
});
