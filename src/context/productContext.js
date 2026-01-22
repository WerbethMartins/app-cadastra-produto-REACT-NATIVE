import { createContext, useContext, useEffect, useState } from 'react';
import { initDB } from '../database/db';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../service/ProductService';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  async function addProduct(name, price, quantity, category) {
    await createProduct(name, price, quantity, category);
    await loadProducts();
  }

  async function editProduct(id, name, price, quantity, category) {
    await updateProduct(id, name, price, quantity, category);
    await loadProducts();
  }

  async function removeProduct(id) {
    await deleteProduct(id);
    await loadProducts();
  }

  useEffect(() => {
  async function start() {
    try {
      console.log('🔵 Iniciando banco...');
      await initDB(); 
      await loadProducts();
      console.log('🟢 Banco pronto');
    } catch (error) {
      console.log('🔴 ERRO NO INIT DATABASE:', error);
    } finally {
      setLoading(false);
    }
  }
  start();
}, []);


  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        editProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
