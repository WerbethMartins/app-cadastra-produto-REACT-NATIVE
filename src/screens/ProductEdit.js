import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useProduct } from '../context/productContext';

export default function ProductEdit({ route, navigation }) {
  const { product } = route.params;
  const { editProduct } = useProduct();

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [quantity, setQuantity] = useState(String(product.quantity));

  async function handleUpdate() {
    await editProduct(
      product.id,
      name,
      Number(price),
      Number(quantity)
    );

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <TextInput value={name} onChangeText={setName} />
        </View>
        <View style={styles.content}>
          <View style={styles.row}>
            <TextInput style={styles.textInput} value={price} keyboardType="numeric" onChangeText={setPrice} />
            <TextInput style={styles.textInput} value={quantity} keyboardType="numeric" onChangeText={setQuantity} />  
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.buttonuUpdate} onPress={handleUpdate}>
              <Text style={styles.updateTitle}>Atualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 8,
    width: '90%',
    elevation: 4, // sombra Android
  },
  header: {
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 1,
  },
  content: {
    marginVertical: 8,
    gap: 4,
  },
   row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: '48%',
    elevation: 1,
  },
  actions: {
    marginTop: 12,
    width: '100%',
  },
  updateTitle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonuUpdate: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#06beaf',
    padding: 10,
    elevation: 1,
  }
});
