import { Router } from "express";
import { getUsers, getUser, updateUser, deleteUser, verifyAdmin } from "../services/userService.js";

const userRoutes = Router();

// [USER] Route pour get la liste des utilisateurs
userRoutes.get("/users", verifyAdmin, getUsers);

// [USER] Route pour get un utilisateur
userRoutes.get("/user", verifyAdmin, getUser);

// [USER] Route pour modifier un utilisateur
userRoutes.put("/user", verifyAdmin, updateUser);

// [USER] Route pour supprimer un utilisateur
userRoutes.delete("/user", verifyAdmin, deleteUser);


export default userRoutes;
