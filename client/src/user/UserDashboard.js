import React from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';

const Dashboard = () => {
  const {user: {name, email, role}} = isAuthenticated();
  return (
    <Layout title='Dashboard' description='User dashboard' className='container'>
      <div className='card mb-5'>
        <h3 className='card-header'>User Information</h3>
        <ul className='list-group'>
          <li className="list-group-item">name: {name}</li>
          <li className="list-group-item">email: {email}</li>
          <li className="list-group-item">role: {role === 0 ? 'Regular user' : 'Admin'}</li>
        </ul>
      </div>
      <div className='card mb-5'>
      <h3 className='card-header'>Purchase history</h3>
        <ul className='list-group'>
          <li className="list-group-item">history</li>
        </ul>
      </div>
    </Layout>
  )
};

export default Dashboard;