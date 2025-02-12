import express from 'express';
import { createUser, getAll, findUserById, Updateuser, DeleteUser, register, login, logout } from '../controllers/usercontroller.js';

const router = express.Router();

router.post('/create', createUser);
router.get('/getall', getAll);
router.get("/finduser/:id", findUserById);
router.put("/update/:id", Updateuser);
router.delete('/delete/:id', DeleteUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;