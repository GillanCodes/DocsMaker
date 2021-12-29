let router = require("express").Router();

let docsController = require('../controllers/doc.contoller');

router.get('/', docsController.getDocs);
router.get('/:id', docsController.getDoc)

router.post('/new', docsController.createDocs);
router.put('/:id/new', docsController.createSection);

module.exports = router;
