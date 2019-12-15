const express = require('express');

const Product = require('../models/product');

const router = express.Router()


/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/products
 * Description: Get All products
 */

router.get('/api/products', (req, res) => {
    Product.find()
    // Return all Products as an Array
    .then((products) => {
      res.status(200).json({ products: products });
    })
    // Catch any errors that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
  });
  
  /**
  * Action:       SHOW
  * Method:       GET
  * URI:          /api/products/5d664b8b68b4f5092aba18e9
  * Description:  Get An Product by Product ID
  */
  router.get('/api/products/:id', function(req, res) {
    Product.findById(req.params.id)
      .then(function(product) {
        if(product) {
          res.status(200).json({ article: article });
        } else {
          // If we couldn't find a document with the matching ID
          res.status(404).json({
            error: {
              name: 'Document Not Found',
              message: 'The provided ID doesn\'t match any documents'
            }
          });
        }
      })
      // Catch any errors that might occur
      .catch(function(error) {
        res.status(500).json({ error: error });
      });
  });
  
  /**
   * Action:      CREATE
   * Method:      POST
   * URI:         /api/products
   * Description: Create a new product
  */
  router.post('/api/products', (req, res) => {
    Product.create(req.body.product)
    // On a successful `create` action, respond with 201
    // HTTP status and the content of the new article.
    .then((newProduct) => {
      res.status(201).json({ product: newProduct });
    })
    // Catch any errors that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
  });
  
  /**
   * Action:      UPDATE
   * Method:      PATCH
  * URI:          /api/products/5d664b8b68b4f5092aba18e9
  * Description:  Update An Product by Product ID
   */
  router.patch('/api/products/:id', function(req, res) {
    Product.findById(req.params.id)
      .then(function(product) {
        if(product) {
          // Pass the result of Mongoose's `.update` method to the next `.then`
          return product.update(req.body.product);
        } else {
          // If we couldn't find a document with the matching ID
          res.status(404).json({
            error: {
              name: 'Document Not Found',
              message: 'The provided ID doesn\'t match any documents'
            }
          });
        }
      })
      .then(function() {
        // If the update succeeded, return 204 and no JSON
        res.status(204).end();
      })
      // Catch any errors that might occur
      .catch(function(error) {
        res.status(500).json({ error: error });
      });
  });
  
  /**
   * Action:      DESTROY
   * Method:      DELETE
  * URI:          /api/products/5d664b8b68b4f5092aba18e9
  * Description: Delete An Product by Product ID
   */
  router.delete('/api/product/:id', (req, res) => {
    Product.findById(req.params.id)
      .then((product) => {
        if(product) {
          // Pass the result of Mongoose's `.delete` method to the next `.then`
          return product.remove();
        } else {
          // If we couldn't find a document with the matching ID
          res.status(404).json({
            error: {
              name: 'Document Not Found',
              message: 'The provided ID doesn\'t match any documents'
            }
          });
        }
      })
      .then(() => {
        // If the deletion succeeded, return 204 and no JSON
        res.status(204).end();
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });
  
  
  // Export the Router so we can use it in the server.js file

module.exports = router

