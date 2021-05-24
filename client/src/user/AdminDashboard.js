import React from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';

const AdminDashboard = () => {
  const {user: {name, email, role}} = isAuthenticated();

  const userLinks = () => {
    return (
      <div className='card mb-5'>
        <h4 className="card-header">Admin Links</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <Link className='nav-link' to='/create/category'>Create Category</Link>
            </li>
            <li className="list-group-item">
              <Link className='nav-link' to='/create/product'>Create Product</Link>
            </li>
          </ul>
      </div>
    )
  }

  const adminInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>User Information</h3>
        <ul className='list-group'>
          <li className="list-group-item">name: {name}</li>
          <li className="list-group-item">email: {email}</li>
          <li className="list-group-item">role: {role === 0 ? 'Regular user' : 'Admin'}</li>
        </ul>
      </div>
    )
  };

  return (
    <Layout title='Dashboard' description={`Welcome back ${name}`} className='container-fluid'>
      <div className='row'>
        <div className='col-3'>
          {userLinks()}
        </div>
        <div className='col-9'>
          {adminInfo()}
        </div>
      </div>
    </Layout>
  )
};

export default AdminDashboard;