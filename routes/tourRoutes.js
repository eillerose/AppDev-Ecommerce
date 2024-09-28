const express = require('express');

const router = express.Router();
const tourController = require("../controller/tourController");

router.get('/', tourController.index);
router.get('/shop/about', tourController.about);
router.get('/shop/product', tourController.product);
router.get('/shop/service', tourController.service);
router.get('/shop/gallery', tourController.gallery);
router.get('/shop/contact', tourController.contact);

module.exports = router;