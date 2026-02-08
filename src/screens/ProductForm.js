// Importação do elementos React-native
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';

// Importação do elementos
import { useProduct, uniqueProductNames } from '../context/productContext';
import { categories } from '../utils/Categories';
import { useMessage } from '../context/messageContext';

export default function ProductForm({ navigation, route }) {

  // Verifica se está no modo de edição
  const editingProduct = route.params?.product;

  const { addProduct } = useProduct();
  const {uniqueProductNames} = useProduct();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState(null);
  const [openCategories, setOpenCategories] = useState(false);
  const [branding, setBranding] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const {showMessage} = useMessage();

  const handleNameChange = (text) => {
    setName(text);
    if(text.length > 0) {
      // Filta os nomes que começam com o que o usuário digitou
      const filtered = uniqueProductNames.filter(item =>
        item.toUpperCase().includes(text.toUpperCase()) && item.toUpperCase() !== text.toUpperCase()
      );
      setSuggestions(filtered);
    }else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion) => {
    setName(suggestion);
    setSuggestions([]); // Limpa as sugestões após selecionar
  }

  async function handleSave() {

    if(!name || !price){
      showMessage("Preencha o nome e o preço!", "error");
      return;
    }

    try {
        const priceNum = parseFloat(price.toString().replace(',', '.'));
        const qtyNum = parseInt(quantity) || 1; // Garante pelo menos um item

        if (editingProduct) {
          // Se existe o produto na rota, será usado a função de editar
          await editProduct(editingProduct.id, name, priceNum, qtyNum, category, branding);
        } else {
          // Caso contrário, será adicionado um novo
          await addProduct(name, priceNum, qtyNum, category, branding);
        }

        navigation.goBack(); // Volta para a lista após salvar
      } catch (error) {
        console.error("Erro ao salvar produto:", error);
        Alert.alert("Erro", "Não foi possível salvar o produto.");
      }
    }

  return (
    <View style={styles.container}>
      <View style={styles.formHeader}>
        <Image source={require('../../assets/new-product.png')} />
        <Text style={styles.productFormTitle}>Cadastrar Produto</Text>
      </View>

      <View style={styles.form}>
        {/* Dropdown de categoria */}
        <TouchableOpacity
          style={styles.select}
          onPress={() => setOpenCategories(!openCategories)}
        >
          <Text style={styles.selectText}>
            {categories.find(c => c.value === category)?.label || 'Selecione uma categoria'}
          </Text>
        </TouchableOpacity>

        {openCategories && (
          <View style={styles.dropdown}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat.value}
                style={styles.option}
                onPress={() => {
                  setCategory(cat.value); 
                  setOpenCategories(false);
                }}
              >
                <Text style={styles.optionText}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TextInput
          style={styles.input}
          value={name}
          placeholder="Ex: Arroz Branco"
          onChangeText={handleNameChange}
        />

        {/* Lista de sugestões */}
        {suggestions.length > 0 &&(
          <View style={styles.suggestionsContainer}>
            {suggestions.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.suggestionItem}
                onPress={() => selectSuggestion(item)}
              >
                <Text style={styles.suggestionText}>✨ {item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TextInput 
          style={styles.input}
          value={branding}
          placeholder='Marca do Produto'
          onChangeText={setBranding}
        />

        <TextInput
          style={styles.input}
          placeholder="Preço"
          keyboardType="numeric"
          onChangeText={setPrice}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          keyboardType="numeric"
          onChangeText={setQuantity}
        />
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

  select: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 12,
  marginBottom: 8,
  backgroundColor: '#fff',
},

  selectText: {
    fontSize: 14,
    color: '#111',
  },

  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 12,
    overflow: 'hidden',
  },

  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  optionText: {
    fontSize: 14,
    color: '#333',
  },

  suggestionsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 2,
    marginRight: 12,
    marginBottom: 12,
    maxHeight: 150, // Limita o tamanho da lista
  },

  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  suggestionText: {
    color: '#333',
    fontWeight: '500',
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
