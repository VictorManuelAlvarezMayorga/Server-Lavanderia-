import { Button, View, Text, TextInput, Alert, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { useState } from "react"

const URL = "https://hzbcddvh-5000.usw3.devtunnels.ms/users/register"


export const createUsers = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        rol: "",
        password: ""
    })

    const onChange = (key, value) => {
        setData({ ...data, [key]: value })
    }

    const onPressRegister = async () => {
        try {
            const response = await axios.post(URL, data)

            if (response.status === 201) {
                alert("Usuario registrado con exito!!")
                navigation.navigate("Login")
            } else {
                alert("Usuario no registrado")
                console.log("Ha ocurrrido un error al registrar tu usuario.")
            }
        } catch (error) {
            console.log("Error en registro:", error)
        }
    }

    const navigation = useNavigation()

    return (
    <View>
      <Text>Registro de Usuario</Text>

      <Text>Nombre:</Text>
      <TextInput
        placeholder="Introduce tu nombre"
        value={formulario.name}
        onChangeText={(valor) => cambiarDato("name", valor)}
      />

      <Text>Email:</Text>
      <TextInput
        placeholder="Introduce tu email"
        value={formulario.email}
        onChangeText={(valor) => cambiarDato("email", valor)}
      />

      <Text>Rol:</Text>
      <TextInput
        placeholder="Ejemplo: admin o client"
        value={formulario.rol}
        onChangeText={(valor) => cambiarDato("rol", valor)}
      />

      <Text>Contraseña:</Text>
      <TextInput
        placeholder="Introduce tu password"
        secureTextEntry={true}
        value={formulario.password}
        onChangeText={(valor) => cambiarDato("password", valor)}
      />

      <TouchableOpacity onPress={registrarUsuario}>
        <Text>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
};
