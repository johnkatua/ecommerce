import React from 'react';
import { API } from '../config';
import Layout from '../core/Layout';

const Signup = () => {
  return (
      <Layout title='Signup' description='Signup to Node React E-commerce app'>
        {API}
      </Layout>
  )
};

export default Signup;