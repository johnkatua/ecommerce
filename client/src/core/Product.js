import React, { useEffect, useState } from 'react';
import { getSingleProduct } from './ApiCore';
import Layout from './Layout';

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const loadProduct = (productId) => {
    getSingleProduct(productId)
      .then(data  => {
        if (data.error) {
          console.log(data.error)
        } else {
          setProduct(data)
        }
      })
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadProduct(productId);
  }, []);
  return (
    <Layout title='Product Page' description='View a single product'>
      <h2 className="mb-4">Single Product</h2>
      <div className="row">
        {JSON.stringify(product)}
      </div>
    </Layout>
  )
};

export default Product;