// import React, { useEffect, useState } from 'react';
// import Layout from '../core/Layout';
// import {isAuthenticated} from '../auth';
// // import {Link} from 'react-router-dom';
// import {createProduct} from './ApiAdmin';

// const AddProduct = () => {
//   const [values, setValues] = useState({
//     name: '',
//     description: '',
//     price: '',
//     categories: [],
//     category: '',
//     shipping: '',
//     quantity: '',
//     photo: '',
//     loading: false,
//     error: '',
//     createdProduct: '',
//     redirectToProfile: false,
//     formData: ''
//   });

//   const {user, token} = isAuthenticated();

//   const {name, description, price, quantity, formData} = values;

//   useEffect(() => {
//     setValues({...values, formData: new FormData()})
//   }, []);

//   const handleChange = name => event => {
//     const value = name === 'photo' ? event.target.files[0] : event.target.value
//     formData.set(name, value)
//     setValues({...values, [name]: value})
//   };

//   const clickSubmit = (event) => {
//     event.preventDefault()
//     setValues({...values, error: '', loading: true})
//     createProduct(user._id, token, formData)
//       .then(data => {
//         console.log(data)
//         if (data.error) {
//           setValues({...values, error: data.error})
//         } else {
//           setValues({
//             ...values,
//             name: '',
//             description: '',
//             price: '',
//             photo: '',
//             quantity: '', 
//             loading: false,
//             createdProduct: data.name,
//           })
//         }
//       })
//   }

//   const newPostForm = () => {
//     return (
//       <form className='mb-3' onClick={clickSubmit}>
//         <h4>Post Photo</h4>
//         <div className="form-group">
//           <label className='btn btn-secondary'>
//             <input type='file' name='photo' accept='image/*' onChange={handleChange('photo')} />
//           </label>
//         </div>
//         <div className="form-group mt-3">
//           <label className='text-muted mb-1'>Name</label>
//           <input type='text' className='form-control' value={name} onChange={handleChange('name')}/>
//         </div>
//         <div className="form-group mt-3">
//           <label className='text-muted mb-1'>Description</label>
//           <textarea className='form-control' value={description} onChange={handleChange('description')} />
//         </div>
//         <div className="form-group mt-3">
//           <label className='text-muted mb-1'>Price</label>
//           <input type='number' className='form-control' value={price} onChange={handleChange('price')} />
//         </div>
//         <div className="form-group mt-3">
//           <label className='text-muted mb-1'>Category</label>
//           <select className='form-control' onChange={handleChange('category')}>
//             <option value='60a378b0a74f314902db6c70'>Node</option>
//             <option value='60a378b0a74f314902db6c70'>NodeJs</option>
//           </select>
//         </div>
//         <div className="form-group mt-3">
//           <label className='text-muted mb-1'>Quantity</label>
//           <input type='number' className='form-control' value={quantity} onChange={handleChange('quantity')}/>
//         </div>
//         <div className="form-group mt-3">
//           <label className='text-muted mb-1'>Shipping</label>
//           <select className='form-control' onChange={handleChange('shipping')}>
//             <option value='0'>No</option>
//             <option value='1'>Yes</option>
//           </select>
//         </div>
//         <button className="btn btn-outline-primary mt-3">Create Product</button>
//       </form>
//     )
//   }
//   return (
//     <Layout title='Add a new product' description={`Welcome ${user.name}, excited to add a new product?`}>
//       <div className='row'>
//         <div className='col-md-8 offset-md-2'>
//           {newPostForm()}
//         </div>
//       </div>
//     </Layout>
//   )
// };

// export default AddProduct;

import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './ApiAdmin';

const AddProduct = () => {
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
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    category: '',
                    shipping: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="Add a new product" description={`G'day ${user.name}, ready to add a new product?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;