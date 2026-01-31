import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../service/AuthService';
import { onAuthStateChanged } from 'firebase/auth';
import { initDB } from '../database/db';
import { set } from 'firebase/database';
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
  const [totalValue, setTotalValue] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Mês atual
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Ano atual
  const uniqueProductNames = [...new Set(products.map(p => p.name))].sort();

  // Função para calcular a diferença de preço de um produto específico
  const getPriceDifference = (productName, currentPrice, currentDate, productBranding) => {
    if (!currentDate) return null;
    const currentItemDate = new Date(currentDate);

    const history = products.filter(p => 
      p.name.toLowerCase() === productName.toLowerCase() && 
      p.branding?.toLowerCase() === productBranding?.toLowerCase() &&
      new Date(p.createdAt) < currentItemDate
    ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (history.length === 0) return null;

    const lastPrice = history[0].price;
    const diff = currentPrice - lastPrice;
    
    const percentage = (diff / lastPrice) * 100; 

    return {
      diff: diff.toFixed(2),
      percentage: percentage.toFixed(1),
      isHigher: diff > 0,
      isLower: diff < 0
    };
  };

  // Filtrar os produtos pelo mês selecionado
  const filteredProducts = products.filter(product => {
    if (!product.createdAt) return false;
    const date = new Date(product.createdAt);
    // LOG DE SEGURANÇA
    // console.log(`Comparando: ${date.getMonth()} vs ${selectedMonth} | ${date.getFullYear()} vs ${selectedYear}`);
    return (
      date.getMonth() === selectedMonth && 
      date.getFullYear() === selectedYear
    );
  });

  // Lista de meses com dados (Dropdown)
  const availableMonths = [...new Set(products.map(p => {
    const d = new Date(p.createdAt);
    return `${d.getMonth()}-${d.getFullYear()}`;
  }))]

  const user = auth.currentUser;

  async function loadProducts() {
    if(user){
      const data = await getProducts();
      setProducts(data);
    }else {
      setProducts([]); // Limpa a lista se o usuário sair
    }
  }

  async function addProduct(name, price, quantity, category, branding = '') {
    await createProduct(name, price, quantity, category, branding);
    await loadProducts();
  }

  async function editProduct(id, name, price, quantity, category, branding = '') {
    await updateProduct(id, name, price, quantity, category, branding);
    await loadProducts();
  }

  async function removeProduct(id) {
    await deleteProduct(id);
    await loadProducts();
  }

  // Função para calcular os totais baseado no array de products
  useEffect(() => {
    const total = filteredProducts.reduce((acc, obj) => {
      return acc + (obj.price * obj.quantity);
    }, 0);

    setTotalValue(total);
    setTotalItems(filteredProducts.length);
  }, [filteredProducts]); // Sempre que a lista de products mudar, ele recalcula.

  // Monitorar a troca de usuário
  useEffect(() => {
    let isMounted = true;

    // 2. Monitorar a troca de usuários
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      try {
        await initDB();
        //console.log("🟢 Banco iniciado!");
        if (user) {
          //console.log(`👤 Usuário logado: ${user.uid}`);
          const data = await getProducts();
          if (isMounted) setProducts(data);
        } else {
          // console.log('🚪 Usuário deslogado');
          if (isMounted) setProducts([]);
        }
      } catch (error) {
        console.error('Erro no fluxo do Context:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);


  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        totalValue,
        totalItems,
        filteredProducts,
        availableMonths,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        getPriceDifference,
        uniqueProductNames,
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
