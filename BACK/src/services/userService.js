import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from "bcrypt";

dotenv.config();

export const verifyAdmin = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Aucun token fourni, accès interdit' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const db = req.db;
    const [user] = await db.promise().query("SELECT * FROM users WHERE id = ?", [decoded.id]);

    if (!user[0]) {
      return res.status(403).json({ message: 'Utilisateur non trouvé' });
    }

    if (user[0].admin !== 1) {
      return res.status(403).json({ message: 'Accès interdit, utilisateur non admin' });
    }

    req.user = user[0];
    next();
  } catch (err) {
    console.error('Erreur de vérification du token:', err);
    return res.status(403).json({ message: 'Token invalide' });
  }
};

export const verifyCredits = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Aucun token fourni, accès interdit' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const db = req.db;
    const [user] = await db.promise().query("SELECT * FROM users WHERE id = ?", [decoded.id]);

    if (!user[0]) {
      return res.status(403).json({ message: 'Utilisateur non trouvé' });
    }

    if (user[0].credits <= 0) {
      return res.status(429).json({ message: 'Tu nas pas assez de credits' });
    }

    req.user = user[0];
    next();
  } catch (err) {
    console.error('Erreur de vérification du token:', err);
    return res.status(403).json({ message: 'Token invalide' });
  }
};

export const getUsers = async (req, res) => {
  const db = req.db;

  try {
    const [users] = await db.promise().query("SELECT * FROM users");

    res.status(200).json(users);
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

export const getUser = async (req, res) => {
  const { id } = req.body;
  const db = req.db;

  try {
    const [user] = await db.promise().query("SELECT * FROM users WHERE id = ?", [id]);

    console.log("testtttt");
    console.log(user);
    if (!user[0]) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(user[0]);
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

export const updateUser = async (req, res) => {
  const { id, email, password, credits } = req.body;
  const db = req.db;

  if (!id || (!email && !password && credits === undefined)) {
    return res.status(400).json({ message: "ID, email, mot de passe ou crédits requis." });
  }
  const updates = [];
  const values = [];

  if (email) {
    updates.push("email = ?");
    values.push(email);
  }
  if (password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    updates.push("hash_password = ?");
    values.push(hashedPassword);
  }
  if (credits !== undefined) {
    updates.push("credits = ?");
    values.push(credits);
  }

  const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
  
  values.push(id);

  try {
    await db.promise().query(query, values);
    res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.body;
  const db = req.db;

  if (!id) {
    return res.status(400).json({ message: "ID requis" });
  }

  try {
    await db.promise().query("DELETE FROM users WHERE id = ?", [id]);
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

