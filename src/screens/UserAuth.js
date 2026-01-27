import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signUp } from '../service/AuthService';

export default function UserAuth({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = async () => {
    try {
      await signUp(email, password);
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      navigation.goBack();
    } catch (error) {
        if(error.code === 'auth/email-already-in-use') {
            Alert.alert("Erro", "Este e-mail já está em uso.");
            return;
        }else if(error.code === 'auth/weak-password'){
            Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
        } else {
            Alert.alert("Erro", "Ocorreu um erro inesperado.");
        }
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.form}>
            <View style={styles.header}>
                    <Text style={styles.title}>Nova Conta</Text>
            </View>
            <TextInput 
                style={styles.input} 
                placeholder="E-mail" 
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput 
                style={styles.input} 
                placeholder="Senha" 
                secureTextEntry 
                onChangeText={setPassword} 
            />
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
        shadowColor: '#ccc',
        shadowOpacity: 1,
        elevation: 5,
    },

    title: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        marginBottom: 20, 
        textAlign: 'center' },

    input: { 
        borderWidth: 1, 
        borderColor: '#ddd', 
        padding: 12, 
        borderRadius: 8, 
        marginBottom: 15 },

    button: { 
        backgroundColor: '#06beaf', 
        padding: 15, 
        borderRadius: 8, 
        alignItems: 'center' },

    buttonText: { 
        color: '#fff', 
        fontWeight: 'bold' }
});