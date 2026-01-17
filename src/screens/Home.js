import React from 'react';
import { View, StyleSheet, Text, Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ProductList from './ProductList';

export default function Home() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
            <Text style={styles.title}>Bem-vindo 👋</Text>
            <Text style={styles.subtitle}>
                Gerencie seus produtos de forma simples e rápida
            </Text>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
            <Image
                source={require('../../assets/product-management.png')}
                style={styles.image}
                resizeMode="contain"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Lista de Produtos')}
            >
            <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.footer}>© 2024 ProductApp. Criado por: Werbeth</Text>
        </View>
    ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 24,
    justifyContent: 'space-between',
  },

  header: {
    marginTop: 40,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },

  hero: {
    alignItems: 'center',
  },

  image: {
    width: 260,
    height: 260,
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#06beaf',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 4,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  footer: {
    textAlign: 'center',
    fontSize: 14,
    color: '#aaa',
    marginBottom: 20,
  },
});
