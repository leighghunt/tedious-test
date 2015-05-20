'use strict';

var express = require('express');
var controller = require('./icp.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/searchByICP/:criteria', controller.searchByICP);

module.exports = router;