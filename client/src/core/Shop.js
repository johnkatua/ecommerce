import React, { useEffect, useState } from 'react';
import { getCategories } from './ApiCore';
import Checkbox from './Checkbox';
import Layout from './Layout';

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [myFilters, setMyFilters] = useState({
    filters: {
      category: [],
      price: []
    }
  })

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

  const handleFilters = (filters, filterBy) => {
    const newFilters = {...myFilters};
    newFilters.filters[filterBy] = filters;
    setMyFilters(newFilters);
    console.log('****', newFilters)
  }
  return (
    <Layout title='Shop Page' description='My shopping page'>
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
          </ul>
        </div>
        <div className="col-8">
          {JSON.stringify(myFilters)}
        </div>
      </div>
    </Layout>
  )
};

export default Shop;