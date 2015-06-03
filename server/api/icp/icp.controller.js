'use strict';

var _ = require('lodash');
var ICP = require('./icp.model');
//var winston = require('winston');

var icp = new ICP();



// Get list of icps
exports.index = function(req, res) {
  ICP.find(null, function (err, icps) {
    if(err) { return handleError(res, err); }
    return res.json(200, icps);
  });
};

// Get a single icp
exports.show = function(req, res) {
  ICP.findById(req.params.id, function (err, icps) {
    if(err) { return handleError(res, err); }
    if(!icp) { return res.send(404); }
    return res.json(icp);
  });
};

exports.searchByICP = function(req, res) {
  ICP.find({ICP: req.params.criteria}, function (err, icps) {
    if(err) { return handleError(res, err); }
    return res.json(200, icps);
  });
};

// Creates a new icp in the DB.
exports.create = function(req, res) {
  ICP.create(req.body, function(err, icp) {
    if(err) { return handleError(res, err); }
    return res.json(201, icp);
  });
};

// Updates an existing icp in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  icp.findById(req.params.id, function (err, icp) {
    if (err) { return handleError(res, err); }
    if(!icp) { return res.send(404); }
    var updated = _.merge(icp, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, icp);
    });
  });
};

// Deletes a icp from the DB.
exports.destroy = function(req, res) {
  icp.findById(req.params.id, function (err, icp) {
    if(err) { return handleError(res, err); }
    if(!icp) { return res.send(404); }
    icp.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}