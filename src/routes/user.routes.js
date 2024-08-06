import { Router } from "express";
import { registorUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registorUser)



export default router