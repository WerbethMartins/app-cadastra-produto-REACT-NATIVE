import { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, PanResponder, Image } from 'react-native';

import { productImages } from '../utils/productImages';
import { useProduct } from '../context/productContext';
import { BuyAgainQuestion } from './BuyAgainQuestion';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = -0.25 * SCREEN_WIDTH; // Limite para considerar swipe

export default function ProductCard({ product, onEdit, onDelete }) {
  const [ buyAgainQuestionMenu, setBuyAgainQuestionMenu] = useState(false);
  const {getPriceDifference, setBuyAgain } = useProduct();
  const priceStatus = getPriceDifference(product.name, product.price, product.createdAt, product.branding);

  const image = productImages[product.category] || productImages.default;

  const buyAgain = product.buyAgain ?? null;

  // Função para atualizar a cor e adicionar o texto, após clicar nas opções de comprar novamente
  const handleBuyAgainChoice = async (choice) => {
    setBuyAgainQuestionMenu(false);
    try {
      await setBuyAgain(product.id, choice);
    } catch (error) {
      console.error('Erro ao salvar decisão de compra:', error);
    }
  };
  
  // Referência para animação
  const translateX = useRef(new Animated.Value(0)).current;
  const scaleY = useRef(new Animated.Value(80)).current; // altura inicial real
  const opacity = useRef(new Animated.Value(1)).current;

  // DEBUG
  // console.log('PRODUCT:', product);

  // Estado para controle de swipe
  const [swipeEnabled] = useState(true);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => swipeEnabled,
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 2,

    onPanResponderMove: (_, gesture) => {
      // Só permite arrastar para esquerda
      if (gesture.dx < 0) {
        translateX.setValue(gesture.dx);
      }
    },

    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx < SWIPE_THRESHOLD) {
        // Usuário arrastou o suficiente = deleta
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleY, {
            toValue: 0,
            duration: 220,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onDelete(product.id);
          onEdit();
        });
      } else {
        // Volta para posição original
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          friction: 8,
        }).start();
      }
    },

    onPanResponderTerminate: () => {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    });

  const handleDeleteButton = () => {
    // Comportamento do swipe completo
    Animated.parallel([
      Animated.timing(translateX, { toValue: -SCREEN_WIDTH, duration: 180, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(scaleY, { toValue: 0, duration: 220, useNativeDriver: false }),
    ]).start(() => onDelete(product.id));
  };

  {/* Tinta do card, para mudar a cor do card, dependendo da escolha */}
  const cardTint =
    buyAgain === 'yes' ? { backgroundColor: '#ECFDF5', borderColor: '#2e7d32', borderWidth: 1 } :
    buyAgain === 'no'  ? { backgroundColor: '#FEF2F2', borderColor: '#c62828', borderWidth: 1 } :
  null;

  return (
    <>
      <Animated.View style={[styles.card, 
        { 
          opacity,
          transform: [{ 
            scaleY: scaleY.interpolate({
              inputRange: [0, 80],
              outputRange: [0, 1],
            }),
          }],
          transformOrigin: 'top',
          overflow: 'hidden', 
        }
      ]}>

      {/* Fundo vermelho que aparece ao arrastar */}
      <Animated.View
        style={[
          styles.deleteBackground,
          {
            opacity: translateX.interpolate({
              inputRange: [-80, 0],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <Text style={styles.deleteText}>Excluir</Text>
      </Animated.View>

      {/* Animação mover o card */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.foregroundCard,
          cardTint, // Aplica a tinta do card
          {
            transform: [{ translateX }],
          },
        ]}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.headerButtons}>
            {buyAgain && (
              <TouchableOpacity onPress={() => handleBuyAgainChoice(null)} style={styles.cancel}>
                <Text style={styles.cancelText}>Limpar decisão</Text>
              </TouchableOpacity>
            )}
          
            <View style={styles.editButtons}>
              {/* Botão de comprar novamente */}
              <TouchableOpacity style={styles.refreshButton} onPress={() => setBuyAgainQuestionMenu(true)}>
                <Image style={styles.refreshImg} source={require("../../assets/refresh.png")} />
              </TouchableOpacity>

              {/* Botão de editar */}
              <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                <Image style={styles.editeImg} source={require("../../assets/compose.png")} />
              </TouchableOpacity>  
            </View>  
          </View>

          <View style={styles.cardBodyColumn}>
            <View style={styles.cardBodySection}>
              {/* Icone do produto */}
              <View style={styles.imageSection}>
                <Image source={image} style={styles.image} />
              </View>
              {/* Título e categoria */}
              <View style={styles.titleSection}>
                 {/* Texto após a escolha */}
                {buyAgain === 'yes' && (
                  <Text style={{ color: '#2e7d32', fontWeight: 'bold' }}>✅ Comprar novamente</Text>
                )}
                {buyAgain === 'no' && (
                  <Text style={{ color: '#c62828', fontWeight: 'bold' , marginEnd: 10, borderWidth: 1, borderColor: '#c62828', padding: 5 }}>🚫 Não comprar</Text>
                )}
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.category}>{`Categoria: ${product.category}`}</Text>

                {/* Exibe a marca apenas se ela existir */}
                {product.branding ? (
                  <Text style={styles.branding}>{`Marca: ${product.branding}`}</Text>
                ) : (
                  <Text style={[styles.branding, { fontStyle: 'italic', opacity: 0.5 }]}>Sem marca</Text>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Conteúdo do produto */}
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.label}>Preço</Text>
            <Text style={styles.value}>R$ {Number(product.price).toFixed(2)}</Text>
          </View>

          {priceStatus && (
            <View
              style={[
                styles.badge,
                { backgroundColor: priceStatus.isHigher ? '#ffebee' : '#e8f5e9' }
              ]}>
                <Text style={{ color: priceStatus.isHigher ? '#c62828' : '#2e7d32', fontSize: 12 }}>
                  {priceStatus.isHigher ? '↑' : '↓'} {Math.abs(priceStatus.percentage)}%
                </Text>
            </View> 
          )}

          <View style={styles.row}>
            {/* Exibe "Kg" para carnes, frutas e verduras, caso contrário "Un" */}
            <Text style={styles.label}>{['carnes', 'frutas', 'verduras', 'frangos', 'pescados'].includes(product.category) ? 'Quantidade (Kg)' : 'Quantidade (Un)'}</Text>
            <Text style={styles.value}>{product.quantity}</Text>
          </View>
        </View>

        {/* Botões */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteButton}>
            <Text style={styles.buttonText}>🗑️ Excluir</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>

      <BuyAgainQuestion
        isVisible={buyAgainQuestionMenu}
        onClose={() => setBuyAgainQuestionMenu(false)}
        onChoose={handleBuyAgainChoice}
      />  
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 30,
    marginVertical: 5,
    width: '85%',
    height: 'auto',
    elevation: 4, // sombra Android
  },

  deleteBackground: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 12,
    backgroundColor: '#c40303',
    paddingRight: 10,
    width: '100%',
  },

  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },  

  foregroundCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    elevation: 4, 
  },

  header: {
    display: "flex",
    flexDirection: 'colunm',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
 
  headerButtons: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 5,
    marginBottom: 10,
  },

  editButtons: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '30%',
  },

  cancel: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#a303ff',
    padding: 8,
    marginBottom: 2,
  },

  cancelText: {
    color: '#fff',
  },

  cardBodySection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },  

   cardBodyColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  refreshButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'none',
    width: 10,
  },

  refreshImg: {
    width: 30,
    height: 30,
    elevation: 4,
  },

  editButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 8,
  },

  editeImg: {
    width: 30,
    height: 30,
    elevation: 4,
  },  

  titleSection: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 2,
    width: '65%',
    marginLeft: 5,
    height: 'auto',
  },

  image: {
    width: 100,
    height: 100,
    marginRight: 5,
    marginBottom: 20,
    resizeMode: 'contain',
  },

  title: {
    textAlign: 'start',
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },

  category: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },  

  content: {
    display: 'flex',
    flexDirection: 'column', 
    gap: 4,
    padding: 5,
    marginTop: 2,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 14,
    color: '#6B7280',
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  badge: {
    position: 'absolute',
    right: 60,
    bottom: 25,
  },  

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  deleteButton: {
    flex: 1,
    display: 'none',
    marginLeft: 6,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
});