const express = require('express');

const Order = require('../models/order');

const router = express.Router()

const passport = require('passport')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/orders
 * Description: Get All orders
 */

router.get('/api/orders', (req, res) => {
    Order.find().populate("products","user")
    // Return all Orders as an Array
    .then((orders) => {
      res.status(200).json({ orders: orders });
    })
    // Catch any errors that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
  });
  
  /**
  * Action:       SHOW
  * Method:       GET
  * URI:          /api/orders/5d664b8b68b4f5092aba18e9
  * Description:  Get An Order by Order ID
  */
  router.get('/api/orders/:id', function(req, res) {
    Order.findById(req.params.id)
      .then(function(order) {
        if(order) {
          res.status(200).json({ order: order });
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
   * URI:         /api/orders
   * Description: Create a new order
  */
  router.post('/api/orders', requireToken, (req, res) => {
    Order.create(req.body.order)
    // On a successful `create` action, respond with 201
    // HTTP status and the content of the new order.
    .then((newOrder) => {
      res.status(201).json({ order: newOrder });
    })
    // Catch any errors that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
  });
  
  /**
   * Action:      UPDATE
   * Method:      PATCH
  * URI:          /api/orders/5d664b8b68b4f5092aba18e9
  * Description:  Update An Order by Order ID
   */
  router.patch('/api/orders/:id', function(req, res) {
    Order.findById(req.params.id)
      .then(function(order) {
        if(order) {
          // Pass the result of Mongoose's `.update` method to the next `.then`
          return order.update(req.body.order);
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
  * URI:          /api/orders/5d664b8b68b4f5092aba18e9
  * Description: Delete An Order by Order ID
   */
  router.delete('/api/orders/:id', (req, res) => {
    Order.findById(req.params.id)
      .then((order) => {
        if(order) {
          // Pass the result of Mongoose's `.delete` method to the next `.then`
          return order.remove();
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
  
  



module.exports = router
