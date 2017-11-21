import express from 'express';
import path from 'upath';


const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/../../template/index.html'));
  });

router.route('/api/v1/users/')
  .post((req, res) => {
    res.status(200).send({ id: 2 });
  });


// 404 routes
router.route('*')
  .all((req, res) => {
    res.status(404).send({ error: 404 });
  });

export default router;
