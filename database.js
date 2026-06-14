import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("provas.db");

export function initDB() {
  db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS provas (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, image TEXT);"
    );
  });
}

export function addProva(title, description, image) {
  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO provas (title, description, image) VALUES (?, ?, ?);",
      [title, description, image]
    );
  });
}

export function getProvas(callback) {
  db.transaction(tx => {
    tx.executeSql(
      "SELECT * FROM provas;",
      [],
      (_, { rows }) => {
        callback(rows._array);
      }
    );
  });
}

export function getCount(callback) {
  db.transaction(tx => {
    tx.executeSql(
      "SELECT COUNT(*) as total FROM provas;",
      [],
      (_, { rows }) => {
        callback(rows._array[0].total);
      }
    );
  });
}
