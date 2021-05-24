import React, { useState } from 'react';
import { isAuthenticated } from '../auth';
import Layout from '../core/Layout';
import {createCategory} from './ApiAdmin';
import {Link} from 'react-router-dom';

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
    createCategory(user._id, token, {name})
      .then(data => {
        if (data.err) {
          setError(true);
        } else {
          setError('');
          setSuccess(true);
        }
      })
  }

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group mb-3'>
        <label className='text-muted mb-2'>Name</label>
        <input type='text' className='form-control' onChange={handleChange} value={name} autoFocus required />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className='text-success'>
        {name} is created successfully
      </h3>
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className='text-danger'>
        {name} already exists
      </h3>
    }
  };

  const goBack = () => {
    return <div className='mt-5'>
      <Link to='/admin/dashboard' className='text-warning'>Back to Dashboard</Link>
    </div>
  }
  return (
    <Layout title='Add a new category' description={`Welcome ${user.name}, ready to create a new category`}>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  )
};

export default AddCategory;