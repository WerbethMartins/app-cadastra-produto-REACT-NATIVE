import { useNavigation } from '@react-navigation/native';
import { useProduct } from '../context/productContext';
import ProductCard from '../components/productCard';
import { FlatList, Button, View, Text, Alert, StyleSheet, Image } from 'react-native';

export default function ProductList() {
  const { products, loading, removeProduct } = useProduct();
  const navigation = useNavigation();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Inicializando banco...</Text>
      </View>
    );
  }

  function handleDelete(id) {
    Alert.alert(
      'Excluir produto',
      'Tem certeza que deseja excluir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => await removeProduct(id),
        },
      ]
    );
  }

  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>

      <View style={styles.navigateButtonSection}>
        <Image source={require('../../assets/add-product.png')}/>
        <Button
          style={styles.navigateButton}
          title="Adicionar Produto"
          onPress={() => navigation.navigate('Cadastro')}
        />
      </View>
      
      <View style={styles.productList}>
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onEdit={() => navigation.navigate('Editar', { product: item })}
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
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
    gap: 5,
    width: '100%',
  },
  navigateButtonSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
    width: '90%',
    boxShadow: '2px 2px 1px rgba(0, 0, 0, 0.3)',
  },
  navigateButton: {
    borderRadius: 10,
    boxShadow: '2px 2px 1px rgba(0, 0, 0, 0.3)',
  },  
  productList: {
    padding: 5,
    width: '100%',
  }
})