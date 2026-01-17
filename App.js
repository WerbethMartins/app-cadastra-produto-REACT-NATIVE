import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { initDB } from './src/database/db';
import { useEffect } from 'react';
import { ProductProvider } from './src/context/productContext';

export default function App() {
  useEffect(() => {
    initDB();
  }, []);
  
  return (
    <ProductProvider  >
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ProductProvider>
  );
}
