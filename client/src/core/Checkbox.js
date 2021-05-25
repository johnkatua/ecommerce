import React from 'react';

const Checkbox = ({categories}) => {
  return categories.map((category, idx) => {
    return <li className='list-unstyled' key={idx}>
      <input type="checkbox" className="form-check-input" />
      <label className="form-check-label">{category.name}</label>
    </li>
  }) 
};

export default Checkbox;