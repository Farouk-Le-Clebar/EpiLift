import { Router } from 'express';
import { verifyCredits } from "../services/userService.js";
import { elevate } from "../services/elevateService.js";

const elevateRoutes = Router();

// [ELEVATE] Route pour élever un utilisateur en lui eneleve 1 crédit
elevateRoutes.post('/elevate', verifyCredits, elevate);

export default elevateRoutes;