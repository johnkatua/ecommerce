import React, { useEffect, useState } from 'react';
import { getCategories } from './ApiCore';

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false
  });

  const {categories, category, search, results, searched} = data;

  const loadCategories = () => {
    getCategories()
      .then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          setData({...data, categories: data})
        }
      })
  };

  useEffect(() => {
    loadCategories()
  }, []);

  const searchSubmit = () => {

  };

  const handleChange = () => {

  }

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select className="btn">
                <option value="All">Pick a category</option>
                {categories.map((category, idx) => (
                  <option value={category._id} key={idx}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <input type="search" className="form-control" onChange={handleChange('search')} placeholder='Search by name' />
          </div>
          <div className="btn input-group-append" style={{border: 'none'}}>
            <button className="input-group-text">Search</button>
          </div>
        </span>
      </form>
    )
  }
  return (
    <div className='row'>
      <div className="container mb-3">
        {searchForm()}
      </div>
    </div>
  )
};

export default Search;