var Sequelize = require('sequelize');
var models = require('../models/models.js');
				  
// GET /statistics
exports.statistics=function(req,res){

 // promise = require('bluebird'),
  
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bbf19fb847cade0b869cd4a59cbc7a1a962f3782
  query1 = 'SELECT COUNT(*) as count FROM "quizzes"',
  query2 = 'SELECT COUNT(*) as count FROM "comments"';
  query3 = 'select count(*) as count from "quizzes" where "id" in (select "quizid" from "comments")';
  query4 = 'select "tema",count(*) as cuenta from "quizzes" group by "tema"';
<<<<<<< HEAD
=======
  query1 = 'SELECT COUNT(*) as count FROM quizzes',
  query2 = 'SELECT COUNT(*) as count FROM comments';
  query3 = "select count(*) as count from quizzes where id in (select quizid from comments)";
  query4 = "select tema,count(*) as cuenta from quizzes group by tema";
>>>>>>> db9b236824321d6075ed3cfdd6e06a4663fc156f
=======
>>>>>>> bbf19fb847cade0b869cd4a59cbc7a1a962f3782

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