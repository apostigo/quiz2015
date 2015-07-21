var Sequelize = require('sequelize');
var models = require('../models/models.js');
				  
// GET /statistics
exports.statistics=function(req,res){

 // promise = require('bluebird'),
  
  query1 = 'SELECT COUNT(*) as count FROM "Quizzes";',
  query2 = 'SELECT COUNT(*) as count FROM "Comments";';
  query3 = 'select count(*) as count from "Quizzes" where "id" in (select "QuizId" from "Comments");';
  query4 = 'select "tema",count(*) as cuenta from "Quizzes" group by "tema";';

  var chain = new Sequelize.Utils.QueryChainer();

  chain
    .add(models.sequelize.query(query1, null, { raw: true, plain: true }))
    .add(models.sequelize.query(query2, null, { raw: true, plain: true }))
	.add(models.sequelize.query(query3, null, { raw: true, plain: true }))
	.add(models.sequelize.query(query4, null, { raw: true }))
    .run()
    .success(function(results) {
		res.render('statistics',{titulo:"ESTADISTICAS ",estadisticas:results,errors: []  }  ) 
    }).error(function(err) {
      console.log('oh no', err);
    });

 };