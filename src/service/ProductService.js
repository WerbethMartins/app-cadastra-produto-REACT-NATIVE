import { getDB } from '../database/db';

export async function getProducts() {
  const db = getDB();
  const result = await db.getAllAsync(
    'SELECT * FROM products ORDER BY id DESC'
  );
  console.log('📦 PRODUTOS DO BANCO:', result);
  return result;
}

export async function createProduct(name, price, quantity, category) {
  const db = getDB();

  // Converta para garantir que o banco receba números
  const numericPrice = parseFloat(price);
  const numericQuantity = parseInt(quantity, 10);

  console.log('🟡 CREATE PRODUCT:', name, price, quantity, category);

  try {
    const result = await db.runAsync(
      'INSERT INTO products (name, price, quantity, category) VALUES (?, ?, ?, ?)',
      [name, numericPrice, numericQuantity, category]
    );
    console.log('✅ SUCESSO NO BANCO! ID Gerado:', result.lastInsertRowId);
    return result; 
  } catch (error) {
    console.error('❌ ERRO REAL AO INSERIR:', error);
    throw error;
  }
}

export async function deleteProduct(id) {
  const db = getDB();
  await db.runAsync('DELETE FROM products WHERE id = ?', [id]);
}

export async function updateProduct(id, name, price, quantity, category) {
  const db = getDB();
  await db.runAsync(
    'UPDATE products SET name = ?, price = ?, quantity = ?, category = ? WHERE id = ?',
    [name, price, quantity, category, id]
  );
}
