var express = require('express');
var router = express.Router();
var queryGraphService = require('../queryGraphService');

/* query PGX */
router.post('/', function(req, res, next) {
  
      var name = req.body.project_name;
      console.log("account to query: " + name);

      queryGraphService.run(req.body).then((msg) => {
        res.render('queryGraph', { title: 'Account graph investigation', graphData: msg, project_name: name});
      }).catch((msg) => {
        console.log(msg)
      })

});

module.exports = router;
