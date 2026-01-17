import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Home from '../screens/Home';
import ProductList from '../screens/ProductList';
import ProductForm from '../screens/ProductForm';
import ProductEdit from '../screens/ProductEdit';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen Style={styles.listTitle} name="Lista de Produtos" component={ProductList} />
      <Stack.Screen name="Cadastro" component={ProductForm} />
      <Stack.Screen name="Editar" component={ProductEdit} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  listTitle: {
    marginTop: 10,
  }
})
