import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { email, password, admin } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email, mot de passe et statut admin requis" });
    }
  
    let credits = 0;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const db = req.db;
  
    try {
      if (admin === true) {
        credits = 100;
      }

      await db.promise().query(
        "INSERT INTO users (email, hash_password, admin, credits) VALUES (?, ?, ?, ?)",
        [email, hashedPassword, admin, credits]
      );
  
      res.status(201).json({ message: "Utilisateur enregistré avec succès" });
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };
  
  

  export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }
  
    const db = req.db;
  
    try {
      const [results] = await db.promise().query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
  
      if (results.length === 0) {
        return res.status(401).json({ message: "Email ou mot de passe invalide" });
      }
  
      const user = results[0];
      const passwordMatch = bcrypt.compareSync(password, user.hash_password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: "Email ou mot de passe invalide" });
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({ token });
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

