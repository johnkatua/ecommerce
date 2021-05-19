const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: 'Product not found'
      })
    }
    req.product = product;
    next();
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  res.json(req.product);

}

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        err: 'Image could not be loaded'
      })
    }
    // check for all fields
    const {name, description, price, category, quantity, shipping} = fields
    if (!name || !description || !price || !category || !quantity || !shipping) {
      return res.status(400).json({
        error: 'All fields required'
      })
    }

    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb'
        })
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      res.json( result );
    })
  })
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json({'message': 'Product deleted successfully'});
  })
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        err: 'Image could not be loaded'
      })
    }
    // check for all fields
    const {name, description, price, category, quantity, shipping} = fields
    if (!name || !description || !price || !category || !quantity || !shipping) {
      return res.status(400).json({
        error: 'All fields required'
      })
    }

    let product = req.product;
    product = _.extend(product, fields)
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb'
        })
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      res.json( result );
    })
  })
};

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found'
        })
      }
      res.send(data);
    })

}
