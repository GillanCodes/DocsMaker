let router = require("express").Router();

let docsController = require('../controllers/doc.contoller');

router.get('/', docsController.getDocs);
router.get('/:id', docsController.getDoc)

router.post('/new', docsController.createDocs);
router.put('/:id/new', docsController.createSection);

router.delete('/:id/delete', docsController.delete);
router.delete('/:id/section/:sectionId/delete', docsController.deleteSection);

module.exports = router;
