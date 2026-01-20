import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useProduct } from '../context/productContext';

export default function ProductForm({ navigation }) {
  const { addProduct, ready } = useProduct();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  async function handleSave() {
    if (!ready) {
      console.log('O banco ainda não está pronto!');
      return;
    }

    if (!name || !price || !quantity) {
      console.log('Campos obrigatórios!');
      return;
    }

    await addProduct(
      name,
      Number(price.replace(',', '.')),
      Number(quantity)
    );

    console.log(`Produto ${name} cadastrado com sucesso!`);

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.formHeader}>
        <Image source={require('../../assets/new-product.png')} />
        <Text style={styles.productFormTitle}>Cadastrar Produto</Text>
      </View>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Nome" onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Preço" keyboardType="numeric" onChangeText={setPrice} />
        <TextInput style={styles.input} placeholder="Quantidade" keyboardType="numeric" onChangeText={setQuantity} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Criar Produto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 20,
  },
  formHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fff',
    backgroundColor: '#06beaf',
    padding: 15,
    width: '100%'
  },
  productFormTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    boxShadow: '2px 2px 1px rgba(0, 0, 0, 0.3)',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    width: '100%'
  },
  button: {
    backgroundColor: '#06beaf',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 
