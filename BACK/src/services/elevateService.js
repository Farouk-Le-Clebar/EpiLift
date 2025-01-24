import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const elevate = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Aucun token fourni, accès interdit' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const db = req.db;

    console.log(decoded.id);
    const [userRows] = await db.promise().query("SELECT * FROM users WHERE id = ?", [decoded.id]);
    const user = userRows[0];


    if (!user) {
      return res.status(403).json({ message: 'Utilisateur non trouvé' });
    }

    await db.promise().query("UPDATE users SET credits = credits - 1 WHERE id = ?", [user.id]);

    req.user = user;

    // Appeler ici le script pour élever l'ascenseur (ou effectuer l'action associée)
    // Exemple : 
    // await runElevatorScript();

    res.status(200).json({ message: "Action effectuée, crédit décrémenté avec succès." });
  } catch (err) {
    console.error('Erreur de vérification du token:', err);
    return res.status(403).json({ message: 'Token invalide' });
  }
};

