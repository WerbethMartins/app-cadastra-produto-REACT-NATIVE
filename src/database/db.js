import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

let db = null;

// Para obter a instância do banco de dados
export function getDB() {
    if(!db){
        throw new Error('Banco não incializado. Chame initiDb() primeiro');
    }
    return db;
}

export async function initDB() {
    if(Platform.OS === 'web'){
        console.log("SQLite não suporta no Web!");
    }
    db = SQLite.openDatabaseSync('products.db');

    await db.execAsync(
    `
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL
        );
    `);

    return db;
}

