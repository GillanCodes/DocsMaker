let router = require("express").Router();

let docsController = require('../controllers/doc.contoller');

router.get('/', docsController.getDocs);