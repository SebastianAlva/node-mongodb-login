import {Router} from "express"
import {login,logout,profile,register} from "../controllers/auth.controller.js"
const router = Router()
import { authRequired } from "../middlewares/validateToken.js";
router.post("/register", register);

router.post("/login", login);

router.post("/logout",logout);

router.get("/profile",authRequired, profile)

export default router