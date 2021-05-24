import React from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createProduct} from './ApiAdmin';

const AddProduct = () => {
  const {user, token} = isAuthenticated();
  return (
    <Layout title='Add a new product' description={`Welcome ${user.name}, excited to add a new product?`}>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>...</div>
      </div>
    </Layout>
  )
};

export default AddProduct;