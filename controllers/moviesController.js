const db = require('../database/models');
const Op = db.Sequelize.Op;

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
            res.render('detailMovie', { pelicula: peliculaDetail});
        });
    },
   
    search: function (req,res){

        db.Movies.findAll({
            where: {
                title: {[Op.like]: '%'+ req.body.search +'%'}
            }
        }
        )
        .then(movies => {
            console.log(movies);
            if (movies != ''){
                console.log('1');
                res.render('peliculas', {peliculas: movies,
                    title: 'Todas las peliculas'});
            }
            return res.render('peliculas', {errors:{ msg:'No se encuentra la pelicula' },
             title: 'Todas las peliculas'});
        })
    },
    add: function(req, res) {
        res.render("crearPelicula");
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
                res.render("editarPelicula",
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