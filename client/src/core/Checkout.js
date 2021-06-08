import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { getBraintreeClientToken } from './ApiCore';
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
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token)
      .then(data => {
        if (data.error) {
          setData({...data, error: data.error})
        } else {
          setData({...data, clientToken: data.clientToken})
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

  const showDropIn = () => {
    return (
      <div>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn options={{
              authorization: data.clientToken
            }} onInstance={instance => (data.instance = instance)} />
            <button className="btn btn-success">Checkout</button>
          </div>
        ) : (
          <div>
            Add some products to the  cart
          </div>
        )}
      </div>
    )
  }
  return (
    <div>
      <h2>Total: Ksh {getTotal()}</h2>
      <br />

      {showCheckout()}
    </div>
  )
};

export default Checkout;