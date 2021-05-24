import React, { useState } from 'react';
import { isAuthenticated } from '../auth';
import Layout from '../core/Layout';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localStorage
  const {user, token} = isAuthenticated();

  const handleChange = (e) => {
    setError('');
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    // make an api request to create category
  }

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group mb-3'>
        <label className='text-muted mb-2'>Name</label>
        <input type='text' className='form-control' onChange={handleChange} value={name} autoFocus />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  )
  return (
    <Layout title='Add a new category' description={`Welcome ${name}, ready to create a new category`}>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>{newCategoryForm()}</div>
      </div>
    </Layout>
  )
};

export default AddCategory;