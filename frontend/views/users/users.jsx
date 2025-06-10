import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import axios from "axios";

const UserId = 108;
const URL = "https://hzbcddvh-5000.usw3.devtunnels.ms/users";

export const UsersView = () => {
  const navigation = useNavigation();

  const cerrarSesion = async () => {
    try {
      await axios.post(`${URL}/logout/${UserId}`);
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
      Alert.alert("Error", "No se pudo cerrar sesión");
    }
  };

  return (
    <View>
      <View>
        <TouchableOpacity onPress={cerrarSesion}>
          <Text>Salir</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ClientView")}>
          <Text>Ver Clientes</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text>Esta es la vista del usuario</Text>
      </View>
    </View>
  );
};
