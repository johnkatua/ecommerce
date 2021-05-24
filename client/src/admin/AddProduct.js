import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createProduct} from './ApiAdmin';

const AddProduct = () => {
  const {user, token} = isAuthenticated();
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
  })

  const {name, description, price, categories, category, shipping, quantity, loading, error, createdProduct, redirectToProfile, formData} = values;

  useEffect(() => {
    setValues({...values, formData: new FormData()})
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value)
    setValues({...values, [name]: value})
  };

  const clickSubmit = (event) => {
    event.preventDefault();
  }

  const newPostForm = () => {
    return (
      <form className='mb-3' onClick={clickSubmit}>
        <h4>Post Photo</h4>
        <div className="form-group">
          <label className='btn btn-secondary'>
            <input type='file' name='photo' accept='image/*' onChange={handleChange('photo')} />
          </label>
        </div>
        <div className="form-group mt-3">
          <label className='text--muted mb-1'>Name</label>
          <input type='text' className='form-control' value={name} onChange={handleChange('name')}/>
        </div>
        <div className="form-group mt-3">
          <label className='text--muted mb-1'>Description</label>
          <textarea className='form-control' value={description} onChange={handleChange('description')} />
        </div>
        <div className="form-group mt-3">
          <label className='text--muted mb-1'>Price</label>
          <input type='number' className='form-control' value={price} onChange={handleChange('price')} />
        </div>
        <div className="form-group mt-3">
          <label className='text--muted mb-1'>Category</label>
          <select className='form-control' onChange={handleChange('category')}>
            <option value='60a378b0a74f314902db6c70'>Node</option>
          </select>
        </div>
        <div className="form-group mt-3">
          <label className='text--muted mb-1'>Quantity</label>
          <input type='number' className='form-control' value={quantity} onChange={handleChange('quantity')}/>
        </div>
        <div className="form-group mt-3">
          <label className='text--muted mb-1'>Shipping</label>
          <select className='form-control' onChange={handleChange('shipping')}>
            <option value='0'>No</option>
            <option value='1'>Yes</option>
          </select>
        </div>
        <button className="btn btn-outline-primary mt-3">Create Product</button>
      </form>
    )
  }
  return (
    <Layout title='Add a new product' description={`Welcome ${user.name}, excited to add a new product?`}>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {newPostForm()}
        </div>
      </div>
    </Layout>
  )
};

export default AddProduct;