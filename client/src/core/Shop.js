import React from 'react';
import Layout from './Layout';

const Shop = () => {
  return (
    <Layout title='Shop Page' description='My shopping page'>
      <div className="row">
        <div className="col-4">
          left
        </div>
        <div className="col-8">
          right
        </div>
      </div>
    </Layout>
  )
};

export default Shop;