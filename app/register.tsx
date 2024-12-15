import { Alert, Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "@/constants/Colors";
import IconEmailWhite from "../assets/images/envelope.png";
import IconEmailDark from "../assets/images/envelope_dark.png";
import PasswordWhite from "../assets/images/trancar.png";
import PasswordDark from "../assets/images/trancar_dark.png";
import PersonWhite from "../assets/images/do-utilizador.png";
import PersonDark from "../assets/images/do-utilizador_dark.png";
import axios from "axios";
import { ThemedKeyboardView } from "@/components/ThemedKeyboardAvoidView";

export default function RegisterScreen() {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const router = useRouter();
  const colorScheme = useColorScheme();

  const singIn = async() => {
    await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/Users/Create`, {
      name: name,
      email: email,
      password: password
    })
    .then(() => {
      Alert.alert('Sucesso!');
      router.push('/')
    }).catch((error) => {
      console.log(error);
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
          Cadastro
        </ThemedText>
        <ThemedKeyboardView style={styles.inputContainer} lightColor='#F4F4F4' darkColor="#1a1a1a">
          {colorScheme === 'light' ? (
            <Image 
              style={styles.icon}
              source={PersonDark}
            />
          ) : (
            <Image
              style={styles.icon}
              source={PersonWhite}
            />
          )}
          <TextInput 
            placeholder="Nome" 
            onChangeText={setName}
            value={name}
            style={styles.input}
          />
        </ThemedKeyboardView>
        <ThemedKeyboardView style={styles.inputContainer} lightColor='#F4F4F4' darkColor="#1a1a1a">
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
        </ThemedKeyboardView>
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
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            style={styles.input}
          />
        </ThemedView>
        <ThemedView style={styles.buttonContainer}>
          <ThemedText style={styles.textButtonContainer}>Já possui conta? </ThemedText>
          <TouchableOpacity onPress={() => {
            router.push('/')
          }} >
            <ThemedText style={{
              color: Colors[colorScheme?? 'light'].tint,
              fontWeight: 700,
              fontFamily: 'Poppins_600SemiBold'
            }}>Entrar</ThemedText>
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
          onPress={singIn}>
            <ThemedText style={{
              color: Colors[colorScheme?? 'light'].background,
              fontFamily: 'Poppins_600SemiBold'
            }}>
              Cadastrar
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
