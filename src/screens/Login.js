import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { TextInput as PaperInput } from 'react-native-paper';
import { signIn } from '../service/AuthService';
import { useMessage } from '../context/messageContext';

// Pacote Expo
import { Ionicons } from '@expo/vector-icons';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {showMessage} = useMessage();

  const handleLogin = async () => {
    try {
        await signIn(email, password);
        showMessage("Login bem-sucedido!", "success");
        navigation.replace('Home'); 
    } catch (error) {
        showMessage("Falha no login. Verifique suas credenciais.", "error");
        if (error.code === 'auth/invalid-credential') showMessage("E-mail ou senha incorretos.", "error");
        if (error.code === 'auth/invalid-email') showMessage("E-mail inválido.", "error");
      
        Alert.alert('Erro de Login', message);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.form}>
            <View style={styles.header}>
                <Image  style={styles.image} source={require('../../assets/product-development.png')} />
                <Text style={styles.title}>Entrar no App</Text>
            </View>

            <PaperInput 
                style={styles.input}
                placeholder="E-mail" 
                placeholderTextColor={"#000"}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
            />
            
            <View style={styles.passwordContainer}>
                <PaperInput
                    style={styles.passwordInput}
                    label="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    right={
                        <PaperInput.Icon
                        icon={showPassword ? "eye-off" : "eye"}
                        onPress={() => setShowPassword(!showPassword)}
                        />
                    }
                    />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.link} 
                onPress={() => navigation.navigate('Auth')} // Vai para a tela de cadastro que criamos
            >
                <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        display: 'flex',
        justifyContent: 'center',
        padding: 20, 
        backgroundColor: '#fff' 
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 40,
    },

    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },  

    image: {
        width: 100,
        height: 100,
    },

    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 30, 
        textAlign: 'center' 
    },
        
    input: { 
        borderWidth: 1, 
        color: '#000',
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

    passwordInput: {
        flex: 1,
        borderWidth: 1, 
        color: '#000',
        borderColor: '#ddd', 
        borderRadius: 8, 
    },
    
    iconStyle: {
        padding: 5,
    },  

    button: { 
        backgroundColor: '#06beaf', 
        padding: 18, 
        borderRadius: 8, 
        alignItems: 'center' 
    },

  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 },

    link: { 
        marginTop: 20, 
        lignItems: 'center' 
    },
    
  linkText: { 
    color: '#06beaf', 
    fontSize: 14 }
});