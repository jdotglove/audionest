import { Router } from 'express';
import { secured } from '../middleware/authorization';
import usersApi from './api/users';

const router = Router();

// General Rout

// This section will help you get a list of all the records.
router.use('/api', secured, usersApi)

export default router;