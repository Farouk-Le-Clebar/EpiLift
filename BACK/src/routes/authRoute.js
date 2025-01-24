import { Router } from "express";
import { loginUser, registerUser } from "../services/authService.js";
import { verifyAdmin } from "../services/userService.js";

const authRoutes = Router();

// [AUTH] Route pour crée un nouvel utilisateur Zebi
authRoutes.post("/register", verifyAdmin, registerUser);

// [AUTH] Route pour se connecter
authRoutes.post("/login", loginUser);

// [AUTH] Route pour se déconnecter
// authRoutes.delete("/sessions", logoutUser); j'ai pas fait le logout


export default authRoutes;
