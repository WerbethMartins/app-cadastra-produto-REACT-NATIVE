import { getDB } from '../database/db';

export async function getProducts() {
  const db = getDB();
  const result = await db.getAllAsync(
    'SELECT * FROM products ORDER BY id DESC'
  );
  return result;
}

export async function createProduct(name, price, quantity) {
  const db = getDB();
  await db.runAsync(
    'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)',
    [name, price, quantity]
  );
}

export async function deleteProduct(id) {
  const db = getDB();
  await db.runAsync(
    'DELETE FROM products WHERE id = ?',
    [id]
  );
}

// Atualiza um produto existente
export async function updateProduct(id, name, price, quantity) {
  const db = getDB();
  await db.runAsync(
    'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?',
    [name, price, quantity, id]
  );
}

