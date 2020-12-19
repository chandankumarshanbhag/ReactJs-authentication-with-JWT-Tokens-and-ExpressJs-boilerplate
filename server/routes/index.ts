import { Router } from "express";
import { login, authenticate } from "./auth"


const router = Router();

router.post("/login",login);
router.post("/authenticate",authenticate);


export default router;