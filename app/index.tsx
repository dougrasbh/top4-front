import { Alert, Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "@/constants/Colors";
import IconEmailWhite from "../assets/images/envelope.png"
import IconEmailDark from "../assets/images/envelope_dark.png"
import PasswordWhite from "../assets/images/trancar.png"
import PasswordDark from "../assets/images/trancar_dark.png"
import axios from "axios";
import { ThemedKeyboardView } from "@/components/ThemedKeyboardAvoidView";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();
  const colorScheme = useColorScheme();

  const login = async() => {
    if (email === '' || password === '') {
      Alert.alert('Preencha todos os campos!')
      return;
    }
    await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/Users/Login`, {
      email: email,
      password: password
    })
    .then(async(response) => {
      await AsyncStorage.setItem('id', JSON.stringify(response.data.id))
        .then(() => {
          router.push('/(tabs)')
        })
    }).catch((error) => {
      if (error.status === 404) {
        Alert.alert('Usuário não cadastrado!')
      } else {
        Alert.alert('Email ou senha incorretos! Tente novamente.')
      }
    })
  }

  return(
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ThemedKeyboardView style={styles.container}>
        <ThemedText style={styles.text} type="subtitle">
          Vamos começar?
        </ThemedText>
        <ThemedView style={styles.inputContainer} lightColor='#F4F4F4' darkColor="#1a1a1a">
          {colorScheme === 'light' ? (
            <Image 
              style={styles.icon}
              source={IconEmailDark}
            />
          ) : (
            <Image
              style={styles.icon}
              source={IconEmailWhite}
            />
          )}
          <TextInput 
            placeholder="Email" 
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            style={styles.input}
          />
        </ThemedView>
        <ThemedView style={styles.inputContainer} lightColor='#F4F4F4' darkColor="#1a1a1a">
          {colorScheme === 'light' ? (
            <Image 
              style={styles.icon}
              source={PasswordDark}
            />
            ) : (
            <Image
              style={styles.icon}
              source={PasswordWhite}
            />
            )}
          <TextInput 
            placeholder="Senha" 
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
            style={styles.input}
          />
        </ThemedView>
        <ThemedView style={styles.buttonContainer}>
          <ThemedText style={styles.textButtonContainer}>Não possui conta? </ThemedText>
          <TouchableOpacity onPress={() => {
            router.push('/register')
          }} >
            <ThemedText style={{
              color: Colors[colorScheme?? 'light'].tint,
              fontWeight: 700,
              fontFamily: 'Poppins_600SemiBold'
            }}>Cadastre-se</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <TouchableOpacity
          style={{
            backgroundColor: Colors[colorScheme?? 'light'].tint,
            padding: RFValue(10),
            borderRadius: RFValue(20),
            width: RFValue(150),
            justifyContent: 'center',
            alignItems: 'center',

          }}
          onPress={() => {
            login()
          }}>
            <ThemedText style={{
              color: Colors[colorScheme?? 'light'].background,
              fontFamily: 'Poppins_600SemiBold'
            }}>
              Entrar
            </ThemedText>
          </TouchableOpacity>
      </ThemedKeyboardView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left'
  },
  text: {
    marginBottom: RFValue(90),
    marginTop: RFValue(10)
  },
  title: {
    justifyContent: 'flex-start',
  },
  inputContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: RFValue(250),
    height: RFValue(50),
    borderRadius: RFValue(6),
    alignItems: 'center',
    marginTop: RFValue(10),
  },
  input: {
    marginLeft: RFValue(10),
    fontSize: RFValue(14)
  },
  icon: {
    marginLeft: RFValue(15),
    width: RFValue(20),
    height: RFValue(20)
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: RFValue(20)
  },
  textButtonContainer: {
    fontWeight: 600
  }
});
