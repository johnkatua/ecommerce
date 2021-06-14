import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getUser, updateUser, updateUserLocally } from './ApiUser';

const Profile = ({match}) => {
  // console.log(match);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false
  });

  const {token} = isAuthenticated();

  const {name, email, password, error, success} = values;

  const init = (userId) => {
    getUser(userId, token)
      .then(data => {
        if(data.error) {
          setValues({...values, error: true})
        } else {
          setValues({...values, name: data.name, email: data.email})
        }
      })
  };

  useEffect(() => {
      init(match.params.userId)
    
  }, []);
  return (
  <Layout title='Profile Update' description='Update your profile' className='container-fluid'>
    <h2>Profile</h2>
    {JSON.stringify(values)}
  </Layout>
  );
};

export default Profile;