const User = require('../models/user');
const braintree = require('braintree');
require('dotenv').config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

exports.generateToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response);
    }
  })
};

exports.processPayment = (req, res) => {
  let nonceFromClientside = req.body.paymentMethodNonce;
  let amountFromClientside = req.body.amount;
  // charge
  let newTransaction = gateway.transaction.sale({
    amount: amountFromClientside,
    paymentMethodNonce: nonceFromClientside,
    options: {
      submitForSettlement: true
    }
  }, (error, result) => {
    if (error) {
      res.status(500).json(error)
    } else {
      res.json(result)
    }
  })
}