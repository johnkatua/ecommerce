import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { getBraintreeClientToken, processPayment } from './ApiCore';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({products, setRun = true}) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  });

  // get user id and token
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token)
      .then(data => {
        if (data.error) {
          setData({...data, error: data.error})
        } else {
          setData({clientToken: data.clientToken})
        }
      })
  };

  useEffect(() => {
    getToken(userId, token)
  }, []);

  const getTotal = () => {
    return products.reduce((currentVal, nextVal) => {
      return currentVal + nextVal.count * nextVal.price
    }, 0)
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-primary'>Sign in to checkout</button>
      </Link>
    )   
  };

  const buyProducts = () => {
    // send nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance.requestPaymentMethod()
    .then((data) => {
      nonce = data.nonce
      // if you have nonce(card type, card number) send nonce as 'paymentMethodNonce'
      // total to be charged
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getTotal(products)
      }
      processPayment(userId, token, paymentData)
        .then(res => {
          setData({...data, success: res.success})
        })
        .catch(error => console.log(error));
    })
    .catch(error => {
      setData({error: error.message});
    })

  }

  const showDropIn = () => {
    return (
      <div onBlur={() => setData({...data, error: ''})} >
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn options={{
              authorization: data.clientToken
            }} onInstance={instance => (data.instance = instance)}
             />
            <button onClick={buyProducts} className="btn btn-success btn-block">Pay</button>
          </div>
        ) : (
          <div>
            Add some products to the  cart
          </div>
        )}
      </div>
    )
  };
  const  showError = (error) => {
    return <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  };

  const showSuccess = (success) => {
    return (
      <div className='alert alert-info' style={{display: success ? '' : 'none'}}>
        Thanks, your payment was successful!
      </div>
    )
  }
  return (
    <div>
      <h2>Total: Ksh {getTotal()}</h2>
      <br />
      {showError(data.error)}
      {showSuccess(data.success)}
      {showCheckout()}
    </div>
  )
};

export default Checkout;