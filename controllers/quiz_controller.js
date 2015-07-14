var models = require('../models/models.js');
var cFiltro="%";
  
// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res) {

  cFiltro = "%";
  if (req.query.search > "") {
    cFiltro= req.query.search.split(' ').join('%');
	cFiltro= '%' + cFiltro.toUpperCase() +'%'
  }

  models.Quiz.findAll({where:["upper(pregunta) like ?", cFiltro], order: 'pregunta ASC'}).then(
    function(quizes) {
      res.render('quizes/index', { quizes: quizes, filtro: cFiltro });
    }
  ).catch(function(error) { next(error);})
};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz });
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado });
};

//  GET /quizes/new
exports.new = function(req,res) {
  var quiz = models.Quiz.build( // crea objeto quiz
	{ pregunta:"Pregunta", respuesta:"Respuesta" }
  );
  
  res.render('quizes/new', {quiz : quiz } );
};

//  POST /quizes/create
exports.create = function(req,res) {
	var quiz = models.Quiz.build( req.body.quiz )
 // guarda en DB los campos pregunta y respuesta de quiz
	quiz
	.save( {fields: ["pregunta","respuesta"]})
	.then(function(){ res.redirect("/quizes")})
};