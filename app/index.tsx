import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google"
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

  const clientId = "573964686608-2loa7hqn6aad6ermcgpgvsvu86suipvs.apps.googleusercontent.com"

  const config = {
    clientId
  }

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const handleToken = () => {
    if (response?.type === 'success') {
      const { authentication } = response;
      const token = authentication?.accessToken;
      console.log(token);
      // Save the token and user data for future use
    }
  }

  useEffect(() => {
    handleToken()
  }, [response])

  return(
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text} type="title" >
        Vamos começar?
      </ThemedText>
      <TouchableOpacity>
      <ThemedText style={styles.text} type="title" onPress={() => promptAsync()}>
        Google
      </ThemedText>
      </TouchableOpacity>
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
