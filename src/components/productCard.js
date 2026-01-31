import { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, PanResponder, Image } from 'react-native';
import { productImages } from '../utils/productImages';
import { useProduct } from '../context/productContext';

const SCREEN_WIDTH = 400; // Largura aproximada da tela
const SWIPE_THRESHOLD = -0.25 * SCREEN_WIDTH; // Limite para considerar swipe

export default function ProductCard({ product, onEdit, onDelete }) {

  const {getPriceDifference} = useProduct();
  const priceStatus = getPriceDifference(product.name, product.price, product.createdAt, product.branding);

  const image = productImages[product.category] || productImages.default;
  
  // Referência para animação
  const fadeAnim = useRef(new Animated.Value(1)).current;
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

  return (
    <Animated.View style={[styles.card, 
      { 
        opacity,
        transform: [{ 
          // Corrija esse código, chat
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
      <View style={styles.deleteBackground}>
        <Text style={styles.deleteText}>Excluir</Text>
      </View>

      {/* Animação mover o card */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.foregroundCard,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.imageSection}>
            <Image source={image} style={styles.image} />
          </View>
          <View style={styles.titleSection}>
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
            <Text style={styles.label}>Quantidade</Text>
            <Text style={styles.value}>{product.quantity}</Text>
          </View>
        </View>

        {/* Botões */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Text style={styles.buttonText}>✏️ Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteButton}>
            <Text style={styles.buttonText}>🗑️ Excluir</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
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
    height: 200,
    elevation: 4, // sombra Android
  },

  deleteBackground: {
    ...StyleSheet.absoluteFillObject,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleSection: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 5,
    width: '65%',
    marginLeft: 5,
    height: 100,
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
    gap: 4,
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

  editButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
    paddingVertical: 10,
    marginRight: 6,
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