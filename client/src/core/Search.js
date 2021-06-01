import React, { useEffect, useState } from 'react';
import { getCategories, list } from './ApiCore';

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

  const searchData = () => {
    if (search) {
      list({search: search || undefined, category: category })
        .then(response => {
          if (response.error) {
            console.log(response.error)
          } else {
            setData({...data, results: response, searched: true})
          }
        })
    }
  }

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (e) => {
    setData({...data, [name]: e.target.value, searched: false})
  }

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select className="btn" onChange={handleChange('category')}>
                <option value="All">Pick a category</option>
                {categories.map((c, idx) => (
                  <option value={c._id} key={idx}>
                    {c.name}
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
        {JSON.stringify(results)}
      </div>
    </div>
  )
};

export default Search;