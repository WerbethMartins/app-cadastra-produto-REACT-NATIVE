import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Animated } from 'react-native';
import { TextInput as PaperInput } from 'react-native-paper';
import { signUp } from '../service/AuthService';

// Import Context
import { useMessage } from '../context/messageContext';

//Pacote Expo
import { Ionicons } from '@expo/vector-icons';

export default function UserAuth({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { showMessage } = useMessage();

  // Referências para a animação
  const iconRotation = useRef(new Animated.Value(0)).current;

  // Interpolação para transformar 0-1 em 0deg-160deg
  const spin = iconRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '160deg'], // Definição de graus
  });

  // Animação do icone
  useEffect(() => {
    Animated.sequence([
        Animated.timing(iconRotation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }),
        // Segunda fase: Volta para 0deg
        Animated.timing(iconRotation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }),
    ]).start();
  }, []);


  const handleCreate = async () => {
    try {
      await signUp(email, password);
      showMessage("Usuário criado com sucesso! ", "success");
      navigation.goBack();
    } catch (error) {
        if(error.code === 'auth/email-already-in-use') {
            showMessage("Esse email já está em uso", "error")
            return;
        }else if(error.code === 'auth/weak-password'){
            showMessage("A senha deve ter pelo menos 6 caracteres.");
        } else {
            showMessage("Algo deu errado.", "error");
        }
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.form}>
            <View style={styles.header}>
                <Animated.View
                    style={{
                        transform: [{rotate: spin}], 
                    }}
                >
                    <Image style={styles.image} source={require('../../assets/product-development.png')}/>
                </Animated.View>
                <View style={styles.title}>
                        <Text style={styles.title}>Criar Conta</Text>
                </View>
            </View>
            <PaperInput 
                style={styles.input} 
                placeholder="E-mail" 
                placeholderTextColor={'#000'}
                onChangeText={setEmail}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
            />
            <View style={styles.passwordContainer}>
                <PaperInput 
                    style={styles.inputPassword} 
                    value={password}
                    placeholder="Senha"
                    placeholderTextColor={'#000'} 
                    secureTextEntry={!showPassword} 
                    onChangeText={setPassword}
                    autoCapitalize="none"  
                    right={
                        <PaperInput.Icon
                        icon={showPassword ? "eye-off" : "eye"}
                        onPress={() => setShowPassword(!showPassword)}
                        />
                    }
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCreate}>
                <Text style={styles.buttonText}>Criar Usuário</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'flex-start', 
        padding: 20, 
        backgroundColor: '#fff' },

    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        paddingVertical: 20,
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 15,
        marginBottom: 20,
    },  

    image: {
        width: 100,
        height: 100,
    },  

    title: { 
        fontSize: 25, 
        fontWeight: 'bold', 
        marginBottom: 15, 
        textAlign: 'center' },

    input: { 
        color: '#000',
        borderWidth: 1, 
        borderColor: '#ddd', 
        borderRadius: 8, 
        marginBottom: 15 
    },

    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 15,
    },

    inputPassword: {
        flex: 1,
        color: '#000',
        borderWidth: 1, 
        borderColor: '#ddd', 
    },
    
    iconStyle: {
        padding: 5,
    },  

    button: { 
        backgroundColor: '#06beaf', 
        padding: 15, 
        borderRadius: 8, 
        alignItems: 'center' 
    },

    buttonText: { 
        color: '#fff', 
        fontWeight: 'bold' 
    }
});