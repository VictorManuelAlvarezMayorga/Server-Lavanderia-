import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";

export const login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async () => {
    const datos = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post("https://hzbcddvh-5000.usw3.devtunnels.ms/users/login", datos);
      if (response.status === 200) {
        Alert.alert("Correcto", "Inicio de sesión exitoso");
        navigation.navigate("UserView");
      } else {
        Alert.alert("Error", "Credenciales incorrectas");
      }
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
      Alert.alert("Error", "Hubo un problema con el servidor");
    }
  };

  return (
    <View>
      <Text>Iniciar Sesión</Text>

      <Text>Email:</Text>
      <TextInput
        placeholder="Ingresa tu correo"
        value={email}
        onChangeText={(texto) => setEmail(texto)}
      />

      <Text>Contraseña:</Text>
      <TextInput
        placeholder="Ingresa tu contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={(texto) => setPassword(texto)}
      />

      <TouchableOpacity onPress={iniciarSesion}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
