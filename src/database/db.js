import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

let db = null;
let initPromise = null;

export async function initDB() {
  if (db) return db;

  if(initPromise)return initPromise;

  initPromise = (async () => {

    if (Platform.OS === 'web') {
      throw new Error('SQLite não é suportado na web');
    }

    try {
      db = await SQLite.openDatabaseAsync('products.db');

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          price REAL NOT NULL,
          quantity INTEGER NOT NULL,
          category TEXT NOT NULL,
          userId TEXT NOT NULL, 
          createdAt TEXT NOT NULL
        );
      `);
      
      return db;
    } catch (error) {
      db = null;
      initPromise = null;
      throw error;
    }
  })();

  return initPromise;
}

export function getDB() {
  if (!db) throw new Error('DB not initialized');
  return db;
}
