import React, { useEffect, useState } from 'react';
import { getCategories } from './ApiCore';
import Layout from './Layout';

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const showCategories = () => {
    getCategories()
      .then(data => {
        if (data.error) {
          setError(data.error)
        }
        else {
          setCategories(data)
        }
      })
  };

  useEffect(() => {
    showCategories();
  }, []);
  return (
    <Layout title='Shop Page' description='My shopping page'>
      <div className="row">
        <div className="col-4">
          {JSON.stringify(categories)}
        </div>
        <div className="col-8">
          right
        </div>
      </div>
    </Layout>
  )
};

export default Shop;