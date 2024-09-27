const express = require('express');
const router = express.Router();
const tourController = require('../controller/tourController');

// GET all tours
router.get('/', tourController.getAllTours);

// GET a specific tour
router.get('/:id', tourController.getTourById);

// POST a new tour
router.post('/', tourController.createTour);


// PUT (update) a tour
router.put('/:id', tourController.updateTour);

// DELETE a tour
router.delete('/:id', tourController.deleteTour);

module.exports = router;