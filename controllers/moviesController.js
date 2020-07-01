const db = require('../database/models');


let moviesController = {
    allMovies: function (req,res){
        db.Movies.findAll()
        .then(movies =>{
            res.render('peliculas', {peliculas: movies,
                title: 'Todas las peliculas'});
        });
    },
   detailsMovies: function (req,res){
       let detailID = req.params.id;
        db.Movies.findByPk(detailID)
        .then(peliculaDetail => {
            res.render('detailMovie', { Movies : peliculaDetail});
        });
    },
   
    
    add: function(req, res) {
        res.render("createPelicula");
    },
    create: function(req, res) {
        db.Movies.create({
            title: req.body.title, 
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length
        });
        res.redirect("/movies");

    },
    edit: function(req,res){
        db.Movies.findByPk(req.params.id)
            .then(function(Movies) {
                res.render("editMovie",
                {Movies:Movies});
            })

    },
    update: function(req, res) {
        db.Movies.update({
            title: req.body.title, 
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length
        }, {
            where: {
                id: req.params.id
            }
        })
        res.redirect("/movies/");

    },
    delete: function(req, res) {
        db.Movies.destroy({
            where: {
                id: req.params.id
            }                              
        })
        res.redirect("/movies");
    }

}

module.exports = moviesController;