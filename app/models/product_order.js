const mongoose = require('mongoose')
// NO NEED FOR THIS MODEL
const  productOrderSchema = new mongoose.Schema({
    
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
      },

  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
    }

}, {
  timestamps: true
})



module.exports = mongoose.model('productOrder', productOrderSchema)
