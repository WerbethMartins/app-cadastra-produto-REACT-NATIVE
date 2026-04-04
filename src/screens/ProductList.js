import { useNavigation } from '@react-navigation/native';
import { useProduct } from '../context/productContext';

// Componentes
import ProductCard from '../components/productCard';
import { HeaderSummary } from '../components/HeaderSummary';
import { MonthSelector } from '../components/MonthSelector';
import { TutorialOverlay } from '../components/TutorialOverlay';
import { HelpMenu } from '../components/helpMenu';

// Hooks
import { useTutorial } from '../hooks/useTutorial';

// React e React Native
import { FlatList, View, Text, StyleSheet, Image, TouchableOpacity, Animated, SectionList } from 'react-native';
import { useState, useRef, useEffect} from 'react';

export default function ProductList() {
  const { products, filteredProducts, selectMonth,loading, removeProduct } = useProduct();
  const { isTutorialActive, stepData, startTutorial, nextStep, stopTutorial } = useTutorial();
  const navigation = useNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Referências para as animações
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateX = useRef(new Animated.Value(-50)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const iconTranslateX = useRef(new Animated.Value(50)).current;

  // Função para separar os produtos por data (exemplo: 01/01/2024)
  const groupProductsByDate = (products) => {
    if (!products || products.length === 0) return [];

    const groups = products.reduce((acc, product) => {
      let dateStr = 'Sem data';

      if (product.createdAt) {
        // Se já for um objeto Date (ou seja, já foi convertido), formata diretamente
        if (product.createdAt instanceof Date) {
          dateStr = product.createdAt.toLocaleDateString('pt-BR');
        } 

        // Caso ainda seja um Timestamp do Firebase
        else if (product.createdAt.toDate) {
          dateStr = product.createdAt.toDate().toLocaleDateString('pt-BR');
        }
      }

      if (!acc[dateStr]) {
        acc[dateStr] = [];
      }
      acc[dateStr].push(product);
      return acc;
    }, {});

    // DEBUG: MOstra no console se as chaves (datas) estão vindo diferentes
    // console.log("Grupos criados:", Object.keys(groups));

    return Object.keys(groups).map(date => ({
      title: date,
      data: groups[date]
    }));
  };

  const sections = groupProductsByDate(filteredProducts);

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
        <Text>Sincronizando dados...</Text>
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
            <SectionList
              data={filteredProducts}
              sections={sections}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={<HeaderSummary />}
              stickyHeaderHiddenOnScroll={true}
              renderItem={({ item }) => (
                <ProductCard 
                  product={item}
                  onEdit={() => navigation.navigate('Editar', { product: item })}
                  onDelete={() => handleRemove(item.id)}
                />
              )}
              renderSectionHeader={({ section: { title } }) => (
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>📅 Compras de {title}</Text>
                </View>
              )}
            />
          </View>

          {/* Botão Flutuante de Ajuda */}
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={(() => setIsMenuVisible(true))}    
          >     
            <Text style={styles.tutorialText}>?</Text>
          </TouchableOpacity>

          {/* Componente do menu */}
          <HelpMenu 
            isVisible={isMenuVisible} 
            onClose={() => setIsMenuVisible(false)}
            onStartTutorial={startTutorial}
          />

          {/* Componente do Tutorial */}
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
    flex: 1,
    display: 'flex',
    padding: 5,
    width: '100%',
  },

  sectionHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f8f9fa', 
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 10,
  },

  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
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