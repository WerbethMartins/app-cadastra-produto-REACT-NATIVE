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
  const [ready, setReady] = useState(false);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  async function addProduct(name, price, quantity) {
    await createProduct(name, price, quantity);
    await loadProducts();
    console.log('🟢 Produto salvo:', name, price, quantity);
  }

  async function editProduct(id, name, price, quantity) {
    await updateProduct(id, name, price, quantity);
    await loadProducts();
  }

  async function removeProduct(id) {
    await deleteProduct(id);
    await loadProducts();

    setProducts(prev =>
      prev.filter(product => product.id !== id)
    );

    console.log('Removendo produto id:', id);
  }

  useEffect(() => {
    async function start() {
      try {
        console.log('🔵 Iniciando banco...');
        await initDB();
        await loadProducts();
        setReady(true);
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
        ready,
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
