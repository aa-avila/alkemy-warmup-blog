const router = require('express').Router();
const CategoryCtrl = require('../controllers/categoryController');

router.get('/categories', CategoryCtrl.getAll);
router.get('/categories/:id', CategoryCtrl.getOne);
router.post('/categories', CategoryCtrl.create);
router.patch('/categories/:id', CategoryCtrl.update);
router.delete('/categories/:id', CategoryCtrl.deleteOne);

module.exports = router;


