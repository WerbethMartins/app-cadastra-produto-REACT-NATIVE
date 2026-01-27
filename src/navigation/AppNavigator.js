import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import Home from '../screens/Home';
import UserAuth from '../screens/UserAuth';
import Login from '../screens/Login';
import ProductList from '../screens/ProductList';
import ProductForm from '../screens/ProductForm';
import ProductEdit from '../screens/ProductEdit';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: '#f5f5f5' },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false }} 
      />

      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} 
      />
      
      <Stack.Screen 
        name="Auth" 
        component={UserAuth} 
        options={{ title: 'Cadastro' }} 
        />

      <Stack.Screen 
        name="Tabs" 
        component={TabNavigator} 
      />

      <Stack.Screen 
        name="Lista de Produtos" 
        component={ProductList} 
      />

      <Stack.Screen 
        name="Cadastro" 
        component={ProductForm} 
      />

      <Stack.Screen 
        name="Editar" 
        component={ProductEdit} 
      />
    </Stack.Navigator>
  );
}