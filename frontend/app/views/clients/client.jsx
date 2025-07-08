import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";

const URL = "https://hzbcddvh-5000.usw3.devtunnels.ms/clients";

export const ClientsView = () => {
  const [clients, setClients] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  const navigation = useNavigation();

  const obtenerClientes = async () => {
    try {
      let res;
      if (searchPhone.trim() !== "") {
        res = await axios.get(`${URL}/search/phone`, {
          params: { phone: searchPhone }
        });
        if (res.status === 200 && res.data) {
          setClients([res.data]);
        }
      } else {
        res = await axios.get(`${URL}/search/name`, {
          params: { name: searchName }
        });
        if (res.status === 200) {
          setClients(res.data);
        }
      }
    } catch (error) {
      console.log("Error al buscar clientes:", error);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, [searchName, searchPhone]);

  const eliminarCliente = async (id) => {
    try {
      const res = await axios.delete(`${URL}/delete/${id}`);
      if (res.status === 200) {
        setClients(clients.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.log("Error al eliminar cliente:", error);
    }
  };

  return (
    <ScrollView>
      <View>
        <Text>Gestión de Clientes</Text>

        <TextInput
          placeholder="Buscar por nombre"
          value={searchName}
          onChangeText={(text) => {
            setSearchName(text);
            setSearchPhone("");
          }}
        />

        <TextInput
          placeholder="Buscar por número de teléfono"
          value={searchPhone}
          onChangeText={(text) => {
            setSearchPhone(text);
            setSearchName("");
          }}
        />

        <TouchableOpacity onPress={() => navigation.navigate("ClientCreate")}>
          <Text>Agregar un cliente</Text>
        </TouchableOpacity>
      </View>

      {clients.map((client) => (
        <View key={client.id}>
          <Text>{client.name} - {client.phone_number}</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("ClientUpdate", { client })}
          >
            <Text>Actualizar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => eliminarCliente(client.id)}
          >
            <Text>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};
