var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController')

/* routes Movies. */
router.get('/', moviesController.allMovies);
router.get('/detail/:id', moviesController.detailsMovies);
router.post('/search', moviesController.search);

router.get('/add', moviesController.add);
router.post('/add', moviesController.create);

router.get('/edit/:id', moviesController.edit);
router.post('/edit/:id', moviesController.update);

router.post('/delete/:id', moviesController.delete);



module.exports = router;
