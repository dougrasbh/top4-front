import { StyleSheet, ActivityIndicator } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function ModalLoading() {

  return(
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" color="#00A86B"  />
      <ThemedText style={styles.text} >
        Processando...
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
