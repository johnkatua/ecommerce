import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import {getProducts} from './ApiCore';

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold')
      .then(data => {
        if(data.error) {
          setError(data.error)
        } else {
          setProductsBySell(data);
        }
      });
  }

  const loadProductsByArrival = () => {
    getProducts('createdAt')
      .then(data => {
        if(data.error) {
          setError(data.error)
        } else {
          setProductsByArrival(data);
        }
      });
  };

  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival()
  }, [])
  return (
    <div>
      <Layout title='Home page' description='Node react e-commerce app'>
        {JSON.stringify(productsByArrival)}
        <hr />
        {JSON.stringify(productsBySell)}
      </Layout>
    </div>
  )
};

export default Home;