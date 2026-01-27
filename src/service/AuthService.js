import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '../configuracao/firebaseConfig';

export const auth = getAuth(app);

export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error; 
  }
};

export async function signIn(email, password){
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }catch(error){
    throw error;
  }
}

export async function logout() {
  try {
    console.log("Tentando deslogar...");
    await signOut(auth);
    console.log("Deslogado com sucesso no Firebase!");
  }catch (error) {
    console.error("Erro ao deslogar", error);
  }
}