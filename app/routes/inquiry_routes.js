const express = require('express');

const Inquiry = require('../models/inquiry');

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
 * URI:         /api/inquiries
 * Description: Get All inquiries
 */

router.get('/api/inquiries', (req, res) => {
  Inquiry.find().populate("user")
    // Return all inquiries as an Array
    .then((inquiries) => {
      res.status(200).json({ inquiries: inquiries });
    })
    // Catch any errors that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
  });
  
  /**
   * Action:      CREATE
   * Method:      POST
   * URI:         /api/inquiries
   * Description: Create a new inquiry
  */
  router.post('/api/inquiries', requireToken, (req, res) => {
    Inquiry.create(req.body.inquiry)
    // On a successful `create` action, respond with 201
    // HTTP status and the content of the new inquiry.
    .then((newInquiry) => {
      res.status(201).json({ inquiry: newInquiry });
    })
    // Catch any errors that might occur
    .catch((error) => {
      console.log('hi')
      res.status(500).json({ error: error });
    });
  });
  
  
  /**
   * Action:      DESTROY
   * Method:      DELETE
  * URI:          /api/inquiries/5d664b8b68b4f5092aba18e9
  * Description: Delete An Inquiry by Inquiry ID
   */
  router.delete('/api/inquiries/:id', (req, res) => {
    Inquiry.findById(req.params.id)
      .then((inquiry) => {
        if(inquiry) {
          // Pass the result of Mongoose's `.delete` method to the next `.then`
          return inquiry.remove();
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

