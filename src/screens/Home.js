import { useEffect, useReducer, useRef, useState } from 'react';
import { View, StyleSheet, Text, Button, Image, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

import { logout } from '../service/AuthService';

export default function Home(products, setProducts) {
    const navigation = useNavigation();

    // Estados 
    const [loading, setLoading] = useState(true);
    const [showActions, setShowActions] = useState(false);

    // Referências para a animação
    const contentOpacity = useRef(new Animated.Value(0)).current;
    const contentTranslateY = useRef(new Animated.Value(20)).current;

    const actionsOpacity = useRef(new Animated.Value(0)).current;
    const actionsTranslateY = useRef(new Animated.Value(30)).current;

    // Lógica de sair 
    const handleLogout = async () => {
      try {
        await logout();
        navigation.replace('Login'); // Redireciona para a tela de login
        setProducts([]); // Limpa os produtos ao sair
      } catch (error) {
        Alert.alert("Erro", "Não foi possível sair.");
      }
    };

    useEffect(() => {
      // Simula loading inicial
      const timer = setTimeout(() => {
        setLoading(false);
        Animated.parallel([
          Animated.timing(contentOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(contentTranslateY, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Após o conteúdo aparecer, mostra os botões
          setShowActions(true);

          Animated.parallel([
            Animated.timing(actionsOpacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(actionsTranslateY, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]).start();
        }); 
      }, 2000); // Tempo de loading

      return () => clearTimeout(timer);

    }, []);

    if(loading) {
      return(
        <View style={styles.loadingContainer}>
          <Image
            source={require('../../assets/imageHome.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <ActivityIndicator style={ styles.loadingIndicator } size="large" color='#06beaf' />
        </View>
      );
    }

    return (
      <View style={styles.container}>

          {/* Conteúdo principal */}
          <Animated.View 
              style={[ styles.hero, { 
                opacity: contentOpacity, transform: [{ translateY: contentTranslateY }], 
              },
            ]}
          >
            {/* Seção de logo, titulo e sub-titulo */}
              <View style={styles.logoSection}>
                <Image
                  source={require('../../assets/imageHome.png')}
                  style={styles.image}
                  resizeMode="contain"
                />
                
              </View>

              {showActions && (
                <Animated.View 
                  style={{ 
                    opacity: actionsOpacity, transform: [{ translateY: actionsTranslateY }],
                  }}
                >
                    <View style={styles.actions}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Lista de Produtos')}
                    >
                      <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleLogout}>
                      <Text style={styles.textLogout}>Sair</Text>
                    </TouchableOpacity>
                  </View>

                </Animated.View>
              )}
          </Animated.View>

          <Text style={styles.footer}>
            © 2026 ProductApp. Criado por: Werbeth
          </Text>
        </View>
    ); 
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0572a5',
    padding: 24,
    marginBottom: 50,
  },
  loadingIndicator: {
    marginTop: 20,
  },  
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 15,
    backgroundColor: '#0572a5',
    padding: 24,
    width: '100%',
    marginBottom: 50,
  },

  logoutButton: {
    borderRadius: 30,
    backgroundColor: '#06beaf',
    paddingVertical: 14,
    paddingHorizontal: 30,
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },  

  textLogout: {
    textAlign: 'center',
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 18,
  },  

  hero: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    padding: 10,
    marginVertical: 40,
  },
  
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 15,
    borderColor: '#ccc',
    paddingVertical: 5,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  image: {
    width: 400,
    height: 450,
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
    paddingHorizontal: 30,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
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
