
const {Router} = require('express');
const {check} = require('express-validator');
const {checkField} = require('../middlewares/check-field')
const { getNews, updateNews, createNews } = require('../controllers/news');

const router= Router();

router.get('/:active', getNews);

router.patch('/',[
    check('id').not().isEmpty(),
    check('archiveDate').not().isEmpty(),
    checkField
], updateNews);

router.post('/', [
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('date').not().isEmpty(),
    check('content').not().isEmpty(),
    check('author').not().isEmpty(),
    checkField
], createNews);

module.exports = router;
