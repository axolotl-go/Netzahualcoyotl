import express from "express";
import db from "./db/connection";

const app = express();
const port = 3000;

type ContactRequest = {
  name: string;
  email: string;
  message: string;
};

app.use(express.json());

db.exec(
  "CREATE TABLE IF NOT EXISTS contacts (name TEXT, email TEXT, message TEXT)",
);

app.post("/contact", (req, res) => {
  const { name, email, message }: ContactRequest = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  db.get("SELECT email FROM contacts WHERE email = ?", [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      return res.status(400).json({ error: "Email already exists" });
    }

    db.run(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ Status: "Ok!" });
      },
    );
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
