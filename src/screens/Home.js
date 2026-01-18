import { useEffect, useReducer, useRef } from 'react';
import { View, StyleSheet, Text, Button, Image, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

    const navigation = useNavigation();

    // Referências para a animação
    const opacity = useRef(new Animated.Value(1)).current;
    const translateY = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);

    return (
      <Animated.View style={styles.container}>

          {/* Hero */}
          <View style={styles.hero}>
              
              <View style={styles.logoSection}>
                <Image
                  source={require('../../assets/product-management.png')}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.title}>
                    ProductApp
                </Text>
                <Text style={styles.subTitle}>
                    Gerencie seus produtos de forma simples e rápida
                </Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Lista de Produtos')}
                >
                  <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sair')}>
                  <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
              </View>
          </View>
          <Text style={styles.footer}>© 2024 ProductApp. Criado por: Werbeth</Text>
        </Animated.View>
    ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
    backgroundColor: '#176c77',
    padding: 24,
    width: '100%',
    marginBottom: 50,
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    padding: 10,
    marginVertical: 60,
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  image: {
    width: 250,
    height: 220,
    marginBottom: 5,
  },

  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  button: {
    borderRadius: 30,
    backgroundColor: '#06beaf',
    paddingVertical: 14,
    paddingHorizontal: 60,
    minWidth: '60%',
    elevation: 4,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  footer: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fffdfd',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
