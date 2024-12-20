import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocalSearchParams, useRouter } from "expo-router";

export default function SuccessScreen() {

  const { id } = useLocalSearchParams();
  const router = useRouter();

  setTimeout(() => {
    router.dismiss(2);
    router.push(`/modal?id=${id}`);
  }, 2000);

  return(
    <ThemedView style={styles.container}>
      <AntDesign name="checkcircle" size={40} color="#00A86B" />
      <ThemedText style={styles.text}>
        Sucesso!
      </ThemedText>
    </ThemedView>
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
    textAlign: 'center'
  }
});
