import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import FormInput from "@/components/form/FormInput";
import FormButton from "@/components/form/FormButton";
import { Spacing } from "@/consts/spacing";
import FullScreen from "@/components/containers/FullScreen";
import { Image } from 'expo-image';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import FormButtonCreate from "@/components/form/FormButtonCreate";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('User logged in successfully');

      router.replace("/home");
    } catch (error: any) {
      let errorMessage = 'An error occurred';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      }
      setMessage(errorMessage);
    }
  };

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <FullScreen>

      <Image
        source={{ uri: "https://www.lojacarros.com.br/static/images/loja-carros.png" }}
        style={styles.logo}
        placeholder={blurhash}
      />

      <FormInput
        label="Username"
        value={email}
        onChangeText={setEmail}
      />

      <FormInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <FormButtonCreate onPress={handleLogin} title="Login!" />

      <Link style={styles.registerLink} href="/register">
        Novo por aqui? Registre-se!
      </Link>

    </FullScreen>
  );
}

const styles = StyleSheet.create({

  imageContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: Spacing.md,
    alignSelf: "center",
  },
  image: {
    flex: 1,
    width: '100%',
    height: 10,
    backgroundColor: '#0553',
  },
  registerLink: {
    marginTop: Spacing.md,
    fontSize: 12,
    textAlign: "center",
  }
});
