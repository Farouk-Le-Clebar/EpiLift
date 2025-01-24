import { Router } from "express";
import authRoutes from "./routes/authRoute.js";
import elevateRoutes from "./routes/elevateRoute.js";
import userRoutes from "./routes/userRoute.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/elevate", elevateRoutes);
router.use("/info", userRoutes);

export default router;
