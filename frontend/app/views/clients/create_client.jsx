import { TouchableOpacity, View, TextInput, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";

const URL = "https://hzbcddvh-5000.usw3.devtunnels.ms/clients";

export const UpdateClients = ({ route }) => {
  const { client } = route.params;
  const [name, setName] = useState(client.name);
  const [phoneNumber, setPhoneNumber] = useState(client.phone_number);

  const navigation = useNavigation();

  const onPressUpdate = async () => {
    try {
      const response = await axios.put(`${URL}/update/${client.id}`, {
        name,
        phone_number: phoneNumber,
      });
      if (response.status === 200) {
        alert("Cliente actualizado correctamente.");
        navigation.navigate("ClientView");
      } else {
        alert("No se pudo actualizar la información.");
      }
    } catch (error) {
      console.log("Error al actualizar cliente:", error);
    }
  };

  return (
    <View>
      <Text>Actualizar Cliente</Text>

      <Text>ID: {client.id}</Text>

      <Text>Nombre:</Text>
      <TextInput value={name} onChangeText={setName} />

      <Text>Teléfono:</Text>
      <TextInput value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />

      <TouchableOpacity onPress={onPressUpdate}>
        <Text>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );
};
