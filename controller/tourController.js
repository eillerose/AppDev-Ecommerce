const tourController = {
  index: (req, res) => {
      res.render('index', {title: 'tourController'});
  },
  about: (req, res) => {
      res.render('about', {title: 'tourController'});
  },
  product: (req, res) => {
      res.render('product', {title: 'tourController'});
  },
  service: (req, res) => {
      res.render('service', {title: 'tourController'});
  },
  gallery: (req, res) => {
      res.render('gallery', {title: 'tourController'});
  },
  contact: (req, res) => {
      res.render('contact', {title: 'tourController'});
  }
};

module.exports = tourController;