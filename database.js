import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("provas.db");

export function initDB() {
  db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS provas (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, image TEXT);"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS questoes (id INTEGER PRIMARY KEY AUTOINCREMENT, prova_id INTEGER, title TEXT, description TEXT, image TEXT);"
    );
  });
}

export function addQuestao(prova_id, title, description, image) {
  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO questoes (prova_id, title, description, image) VALUES (?, ?, ?, ?);",
      [prova_id, title, description, image]
    );
  });
}

export function getQuestoes(prova_id, callback) {
  db.transaction(tx => {
    tx.executeSql(
      "SELECT * FROM questoes WHERE prova_id = ?;",
      [prova_id],
      (_, { rows }) => {
        callback(rows._array);
      }
    );
  });
}