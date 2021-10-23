const router = require('express').Router();
const PostCtrl = require('../controllers/postController');

router.get('/posts', PostCtrl.getAll);
router.get('/posts/:id', PostCtrl.getOne);
router.post('/posts', PostCtrl.create);
router.patch('/posts/:id', PostCtrl.update);
router.delete('/posts/:id', PostCtrl.deleteOne);

module.exports = router;