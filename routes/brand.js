const { Router } = require('express');
const { brandPost, brandGet } = require('../controllers/brand');
const { validatejwt } = require('../middleware/validatejwt');


const router = Router();

router.get('/', validatejwt, brandGet)
router.post('/', brandPost);

module.exports = router;