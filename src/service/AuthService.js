import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '../configuracao/firebaseConfig';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


export const auth = getAuth(app);
const db = getFirestore(app);

export async function signUp(email, password) {
  try {
    // Cria o usuário firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Cria o documento do usuário no Firestore com a role 'user'
    // Foi usado o UID do Auth como ID do documento para ficarem vinculados
    await setDoc(doc(db, 'users', user.uid), {
      email: email,
      role: 'user',
      createdAt: new Date()
    })

    return user;
  } catch (error) {
    console.error("Erro no cadastro", error);
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