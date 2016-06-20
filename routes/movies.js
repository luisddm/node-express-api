const Movie = require('../models/movie');
const express = require('express');

const router = express.Router();

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to our api!' });
});

// GET movies
router.route('/movies').get((req, res) => {
  Movie.find((err, movies) => {
    if (err) {
      return res.send(err);
    }

    res.json(movies);
  });
});

// POST movies
router.route('/movies').post((req, res) => {
  var movie = new Movie(req.body);

  movie.save(err => {
    if (err) {
      return res.send(err);
    }

    res.send({ message: 'Movie Added' });
  });
});

// GET movies/:id
router.route('/movies/:id').get((req, res) => {
  Movie.findOne({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.send(err);
    }

    res.json(movie);
  });
});

// PUT movies/:id
router.route('/movies/:id').put((req, res) => {
  Movie.findOne({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.send(err);
    }

    for (let prop in req.body) {
      movie[prop] = req.body[prop];
    }

    // save the movie
    movie.save((err) => {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Movie updated!' });
    });
  });
});

// DELETE movies/:id
router.route('/movies/:id').delete((req, res) => {
  Movie.remove({
    _id: req.params.id,
  }, (err, movie) => {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
});

module.exports = router;
