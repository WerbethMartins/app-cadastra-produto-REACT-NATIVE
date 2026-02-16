// Importação Navigator
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

// Importação Firebase 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './src/configuracao/firebaseConfig';

// Importação do arquivo do banco de dados
import { initDB } from './src/database/db';

// Importação dos elementos do React
import { useEffect, useState } from 'react';

//Importação dos Provider
import { ProductProvider } from './src/context/productContext';
import { MessageProvider } from './src/context/messageContext';

// Importação do componenetes da biblioteca paper
import { MD3LightTheme, PaperProvider } from 'react-native-paper';

const auth = getAuth(app);

export default function App() {

  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Monitora se o usuário está logado ou não
  useEffect(() => {
    initDB();
    const subscriber = onAuthStateChanged(auth, (useState) => {
      setUser(useState);
      if(initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  if (initializing) return null;
  
  return (
    <PaperProvider theme={MD3LightTheme}>
      <MessageProvider>
        <ProductProvider  >
          <NavigationContainer>
            {/* Se existir 'user', mostra as telas do App. Se não, mostra Login */}
            { user ?  <AppNavigator /> : <AppNavigator /> }
          </NavigationContainer>
        </ProductProvider>
      </MessageProvider>
    </PaperProvider>
  );
}
