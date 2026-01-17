import { View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { useProduct } from '../context/productContext';

export default function ProductEdit({ route, navigation }) {
  const { product } = route.params;
  const { updateProduct } = useProduct();

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [quantity, setQuantity] = useState(String(product.quantity));

  async function handleUpdate() {
    await updateProduct(
      product.id,
      name,
      Number(price),
      Number(quantity)
    );

    navigation.goBack();
  }

  return (
    <View>
      <TextInput value={name} onChangeText={setName} />
      <TextInput value={price} keyboardType="numeric" onChangeText={setPrice} />
      <TextInput value={quantity} keyboardType="numeric" onChangeText={setQuantity} />

      <Button title="Atualizar" onPress={handleUpdate} />
    </View>
  );
}
