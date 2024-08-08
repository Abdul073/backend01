import { Router } from "express";
import { loginUser, logoutUser, registorUser } from "../controllers/user.controller.js";
import {upload} from '../middlewares/multer.middlerware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registorUser)

router.route("/login").post(loginUser)

//secured route
router.route("/logout").post(verifyJWT, logoutUser)

export default router