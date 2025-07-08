import { Link } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { login } from "./views/login";
import { usersView } from "./views/users/users";
import { createUsers } from "./views/users/create_users";
import { createClients } from "./views/clients/create_client";
import { clientsView } from "./views/clients/client";
import { updateClients } from "./views/clients/client_updates";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="UsersView" component={usersView} />
        <Stack.Screen name="CreateUsers" component={createUsers} />
        <Stack.Screen name="CreateClients" component={createClients} />
        <Stack.Screen name="ClientsView" component={clientsView} />
        <Stack.Screen name="UpdateClient" component={updateClients
            
        } />

      </Stack.Navigator>
    </NavigationContainer>
  );
}