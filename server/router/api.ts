import {Router} from "express";
import authController from "../controllers/auth-controller";
import barsController from "../controllers/bars-controller";
import { body } from "express-validator";
import dbService from "../services/db-service";
import auth from "../middlewares/auth-ware";

const router = Router();

(async() => {

await dbService.createTables();

router.get("/bars", barsController.getAll);
router.get("/details", auth, barsController.getDetails);
router.post("/add", auth, barsController.addUser);
router.post("/rm", auth, barsController.rmUser);

router.post("/signup", body(["username","password"]).isLength({min: 3, max: 16}), authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/refresh", authController.refresh);

})()

export default router;