import { Router } from 'express';
import { loginUser, getUserPlaylists } from './handlers';

const router = Router();

// General Rout

// This section will help you get a list of all the records.
router.get('/user/:id',  async (req, res) => {
  console.log('Req: ', JSON.stringify(req.headers, null, 4));
  console.log('Params: ', JSON.stringify(req.params));
  res.status(200).json().end();
});
  
router.post('/user/login', loginUser);
router.get('/user/playlists', getUserPlaylists);

export default router;