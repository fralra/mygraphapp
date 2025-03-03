var express = require('express');
var router = express.Router();
var getPGXTokenService = require('../getPGXTokenService');


/* get PGX access token */
router.get('/', function(req, res, next) {

  getPGXTokenService.run().then((msg) => {

    //console.log("result get token service: " + msg);
    res.render('graph', { title: 'Bank sample graph', msg: msg});

  }).catch((msg) => {
    console.log(msg);
  });
});


module.exports = router;
