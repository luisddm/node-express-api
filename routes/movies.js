const Movie = require('../models/movie');
const express = require('express');

const router = express.Router();

router.route('/movies').get((req, res) => {
  Movie.find((err, movies) => {
    if (err) {
      return res.send(err);
    }

    res.json(movies);
  });
});

router.route('/movies').post((req, res) => {
  var movie = new Movie(req.body);

  movie.save(err => {
    if (err) {
      return res.send(err);
    }

    res.send({ message: 'Movie Added' });
  });
});

module.exports = router;
