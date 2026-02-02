import { useNavigation } from '@react-navigation/native';
import { useProduct } from '../context/productContext';

// Componentes
import ProductCard from '../components/productCard';
import { HeaderSummary } from '../components/HeaderSummary';
import { MonthSelector } from '../components/MonthSelector';
import { useTutorial } from '../hooks/useTutorial';
import { TutorialOverlay } from '../components/TutorialOverlay';

// React e React Native
import { FlatList, Button, View, Text, StyleSheet, Image, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { useState, useRef, useEffect} from 'react';

export default function ProductList() {
  const { filteredProducts,products, selectedMonth,loading, removeProduct } = useProduct();
  const { isTutorialActive, stepData, startTutorial, nextStep, stopTutorial } = useTutorial();
  const navigation = useNavigation();

  // Referências para as animações
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateX = useRef(new Animated.Value(-50)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const iconTranslateX = useRef(new Animated.Value(50)).current;

  // Animação de entrada dos botões e ícones
  useEffect(() => {
    Animated.parallel([
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(buttonTranslateX, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(iconOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(iconTranslateX, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Função para remover produto com animação
  function handleRemove(id){
    removeProduct(id);
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Inicializando banco...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        {/* Animação do botão de animação/Icone */}
        <View style={styles.navigateButtonSection}>
          <Animated.View
            style={{ 
              opacity: iconOpacity, transform: [{ translateX: iconTranslateX }],
            }}
          >
            <Image source={require('../../assets/add-product.png')}/>
          </Animated.View>

          {/* Animação do botão */}
          <Animated.View 
            style={{ 
              opacity: buttonOpacity, transform: [{ translateX: buttonTranslateX }], 
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.navigateButton}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Adicionar Produto</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Seletor de meses */}    
        <MonthSelector />
      
          {/* Lista de produtos */}  
          <View style={styles.productList}>
            <FlatList
              data={filteredProducts}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 20 }}
              ListHeaderComponent={<HeaderSummary />} /* Ele aparece no topo */
              renderItem={({ item }) => (
                <ProductCard
                  product={item}
                  onEdit={() => navigation.navigate('Editar', { product: item })}
                  onDelete={() => handleRemove(item.id)}
                />
              )}
              ListEmptyComponent={
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                  Nenhum produto cadastrado neste mês.
                </Text> 
              }
            />
          </View>

          {/* Botão Flutuante de Ajuda */}
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={startTutorial}    
          >     
            <Text style={styles.tutorialText}>?</Text>
          </TouchableOpacity>

          {/* O Componente do Tutorial */}
          <TutorialOverlay 
            isVisible={isTutorialActive}
            stepData={stepData}
            onNext={nextStep}
            onClose={stopTutorial}
          />
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  navigateButtonSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
    width: '90%',
    boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)',
  },

  navigateButton: {
    borderRadius: 10,
    backgroundColor: '#06beaf',
    padding: 10,
    boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.3)',
  },  

  productList: {
    display: 'flex',
    padding: 5,
    width: '100%',
    maxHeight: 600,
  },

  helpButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    backgroundColor: '#06beaf',
    right: -22,
    width: 50,
    bottom: 50,
    height: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  tutorialText: { 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold',
    marginRight: 10, 
  }
})