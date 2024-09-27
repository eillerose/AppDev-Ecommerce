const db = require('../config/db');

const tourController = {
  // Get all tours
  getAllTours: async (req, res) => {
    try {
      const [tours] = await db.promise().query('SELECT * FROM tours');
      res.json(tours);
    } catch (error) {
      console.error('Error fetching tours:', error);
      res.status(500).json({ message: 'Error fetching tours' });
    }
  },

  // Get a specific tour by ID
  getTourById: async (req, res) => {
    try {
      const [tour] = await db.promise().query('SELECT * FROM tours WHERE id = ?', [req.params.id]);
      if (tour.length === 0) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      res.json(tour[0]);
    } catch (error) {
      console.error('Error fetching tour:', error);
      res.status(500).json({ message: 'Error fetching tour' });
    }
  },

  // Create a new tour
  createTour: async (req, res) => {
    const { name, description, price, duration, image, featured } = req.body;
    try {
      const [result] = await db.promise().query(
        'INSERT INTO tours (name, description, price, duration, image, featured) VALUES (?, ?, ?, ?, ?, ?)',
        [name, description, price, duration, image, featured]
      );
      res.status(201).json({ id: result.insertId, message: 'Tour created successfully' });
    } catch (error) {
      console.error('Error creating tour:', error);
      res.status(500).json({ message: 'Error creating tour' });
    }
  },

  // Update an existing tour
  updateTour: async (req, res) => {
    const { name, description, price, duration, image, featured } = req.body;
    try {
      const [result] = await db.promise().query(
        'UPDATE tours SET name = ?, description = ?, price = ?, duration = ?, image = ?, featured = ? WHERE id = ?',
        [name, description, price, duration, image, featured, req.params.id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      res.json({ message: 'Tour updated successfully' });
    } catch (error) {
      console.error('Error updating tour:', error);
      res.status(500).json({ message: 'Error updating tour' });
    }
  },

  // Delete a tour
  deleteTour: async (req, res) => {
    try {
      const [result] = await db.promise().query('DELETE FROM tours WHERE id = ?', [req.params.id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      res.json({ message: 'Tour deleted successfully' });
    } catch (error) {
      console.error('Error deleting tour:', error);
      res.status(500).json({ message: 'Error deleting tour' });
    }
  }
};

module.exports = tourController;