import { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function ProductCard({ product, onEdit, onDelete }) {

  // Referência para animação
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const heightAnim = useRef(new Animated.Value(1)).current;

  // Função para animar a exclusão
  function handleDelete() {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDelete(); // Remove o estado após a animação
    });
  }

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ scaleY: heightAnim }] }]}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>{product.name}</Text>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Preço</Text>
          <Text style={styles.value}>R$ {Number(product.price).toFixed(2)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Quantidade</Text>
          <Text style={styles.value}>{product.quantity}</Text>
        </View>
      </View>

      {/* Ações */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.buttonText}>✏️ Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>🗑️ Excluir</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 8,
    elevation: 4, // sombra Android
  },

  header: {
    marginBottom: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },

  content: {
    marginVertical: 8,
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

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  editButton: {
    flex: 1,
    marginRight: 6,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
  },

  deleteButton: {
    flex: 1,
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