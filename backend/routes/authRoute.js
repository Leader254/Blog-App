import express from 'express';
import { Register, Login, Logout } from '../Controllers/authentication.js';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', Logout);

export default router;