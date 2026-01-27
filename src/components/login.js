import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import app from '../configuracao/firebaseConfig';

export default function Login() {
    const auth = getAuth(app);

    function logar() {
        createUserWithEmailAndPassword(auth, 'teste@gmail.com', '123456')
        .then((userCredential) => console.log('Usuário criado com sucesso!', userCredential))
        .catch((error) => console.log('Erro ao criar usuário:', error));
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={createUser}>
                <Text>Cadastrar Usuário</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});