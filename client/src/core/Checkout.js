import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';

const Checkout = ({products, setRun = true}) => {

  const getTotal = () => {
    return products.reduce((currentVal, nextVal) => {
      return currentVal + nextVal.count * nextVal.price
    }, 0)
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <button className='btn btn-success'>Checkout</button>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-primary'>Sign in to checkout</button>
      </Link>
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