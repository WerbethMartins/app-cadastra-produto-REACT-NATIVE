import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../configuracao/firebaseConfig';

const auth = getAuth(app);

export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error; 
  }
}
