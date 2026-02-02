import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './src/configuracao/firebaseConfig';
import { initDB } from './src/database/db';
import { useEffect, useState } from 'react';
import { ProductProvider } from './src/context/productContext';
import { MessageProvider } from './src/context/messageContext';

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
    <MessageProvider>
      <ProductProvider  >
        <NavigationContainer>
          {/* Se existir 'user', mostra as telas do App. Se não, mostra Login */}
          { user ?  <AppNavigator /> : <AppNavigator /> }
        </NavigationContainer>
    </ProductProvider>
    </MessageProvider>
  );
}
