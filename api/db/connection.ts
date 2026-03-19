import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.join(__dirname, "database.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

export default db;
