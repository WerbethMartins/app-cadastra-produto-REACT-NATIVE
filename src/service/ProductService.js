import { getDB } from '../database/db';
import { auth } from '../service/AuthService';

import { Alert } from 'react-native';

export async function getProducts() {
  const db = getDB();
  const userId = auth.currentUser?.uid; // Pegar o ID do usuário logado

  if(!userId) {
    Alert.alert("Faça login para ver seus produtos.");
    return [];
  }

  const result = await db.getAllAsync(
    'SELECT * FROM products  WHERE userId = ? ORDER BY id DESC', [userId]
  );

  // console.log('📦 PRODUTOS DO BANCO:', userId, result);
  return result;
}

export async function createProduct(name, price, quantity, category, branding = '') {
  const db = getDB();
  const user = auth.currentUser;
  const createdAt = new Date().toISOString(); // Pega a data e hora atual

  if(!user){
    Alert.alert("Usuário não identificado!");
    return
  }

  const userId = user.uid;

  // Converta para garantir que o banco receba números
  const numericPrice = parseFloat(price);
  const numericQuantity = parseInt(quantity, 10);

  //DEBUG
  // console.log('🟡 CREATE PRODUCT:', name, price, quantity, category, userId);

  try {
    const result = await db.runAsync(
      'INSERT INTO products (name, price, quantity, category, branding, userId, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, numericPrice, numericQuantity, category, branding, userId, createdAt]
    );

    // DEBUG
    // console.log('✅ SUCESSO NO BANCO! ID Gerado:', result.lastInsertRowId);
    
    return result; 
  } catch (error) {
    console.error('❌ ERRO REAL AO INSERIR:', error);
    throw error;
  }
}

export async function deleteProduct(id) {
  const db = getDB();
  const userId = auth.currentUser?.uid;
  await db.runAsync('DELETE FROM products WHERE id = ? AND userId = ?', [id, userId]);
}

export async function updateProduct(id, name, price, quantity, category) {
  const db = getDB();
  const userId = auth.currentUser?.uid;
  await db.runAsync(
    'UPDATE products SET name = ?, price = ?, quantity = ?, category = ?, branding = ? WHERE id = ? AND userId = ?',
    [name, price, quantity, category, '', id, userId]
  );
}
