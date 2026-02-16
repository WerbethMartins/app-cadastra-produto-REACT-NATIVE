import { createContext, useContext, useEffect, useState } from 'react';

//Importações firebase
import { db, auth } from '../configuracao/firebaseConfig'; 
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';


const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Mês atual
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Ano atual
  const [isAdmin, setIsAdmin] = useState(false);

  // Nomes únicos para o Autocomplete
  const uniqueProductNames = [...new Set(products.map(p => p.name))].sort();

  // Monitorar usuário e sincronizar  com Firebase
  useEffect(() => {
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        //  console.log("Meu UID atual:", user.uid);
        try {
          // Verificar se o usuário é Admin 
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            console.log("Dados vindos do banco:", userDocSnap.data()); setIsAdmin(userDocSnap.data().role === 'admin');
          } else {
            setIsAdmin(false);
          }
          // --------------------------------------------

          // Monitorar os Produtos
          const colRef = collection(db, 'users', user.uid, 'products');
          const q = query(colRef, orderBy('createdAt', 'desc'));

          unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              list.push({
                ...data,
                id: doc.id,
                createdAt: data.createdAt?.toDate() || new Date(), 
              });
            });
            setProducts(list);
            setLoading(false);
          }, (error) => {
            console.error("Erro no Firestore Snapshot:", error);
            setLoading(false);
          });

        } catch (error) {
          console.error("Erro ao carregar dados do usuário:", error);
          setLoading(false);
        }
      } else {
        setProducts([]);
        setIsAdmin(false); // Reset ao deslogar
        setLoading(false);
        if (unsubscribeSnapshot) unsubscribeSnapshot();
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

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
    const date =  product.createdAt;
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

  // Funções CRUD
  async function addProduct(name, price, quantity, category, branding = '') {
    const user = auth.currentUser;
    if (!user) return;

    const colRef = collection(db, 'users', user.uid, 'products');
    await addDoc(colRef, {
      name, price, quantity, category, branding,
      createdAt: serverTimestamp()
    });
  }

  async function editProduct(id, name, price, quantity, category, branding = '') {
    console.log("Tentando editar o produto com ID:", id);
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'users', user.uid, 'products', id);
    await updateDoc(docRef, {
      name, price, quantity
    });
  }

  async function removeProduct(id) {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'users', user.uid, 'products', id);
    await deleteDoc(docRef);
  }

  // Função para calcular os totais baseado no array de products
  useEffect(() => {
    const total = filteredProducts.reduce((acc, obj) => {
      return acc + (obj.price * obj.quantity);
    }, 0);
    setTotalValue(total);
    setTotalItems(filteredProducts.length);
  }, [filteredProducts]); // Sempre que a lista de products mudar, ele recalcula.

  
  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        isAdmin,
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
