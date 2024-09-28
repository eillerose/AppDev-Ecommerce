const express = require('express');
const path = require('path');
const tourRoutes = require('./routes/tourRoutes');
const db = require('./config/db');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/tours', tourRoutes);

// Home route
app.get('/', async (req, res) => {
  try {
    // Fetch featured tours from the database
    const [featuredTours] = await db.promise().query(
      'SELECT id, name, description, image FROM tours WHERE featured = 1 LIMIT 3'
    );

    // Fetch testimonials from the database
    const [testimonials] = await db.promise().query(
      'SELECT customer_id, quote FROM testimonials ORDER BY RAND() LIMIT 3'
    );

    res.render('index', { featuredTours, testimonials });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

// About route
app.get('/about', (req, res) => {
  res.render('about');
});

// Contact route
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
});
  

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;