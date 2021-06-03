import React, { useEffect, useState } from 'react';
import { getSingleProduct } from './ApiCore';
import Card from './Card';
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
    <Layout title={product && product.name} description={product && product.description && product.description.substring(0, 100)}>
      <div className="product">
        {product && product.description && <Card product={product} showViewProductButton={false} />}
      </div>
    </Layout>
  )
};

export default Product;