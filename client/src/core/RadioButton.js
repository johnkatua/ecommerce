import React, { useState } from 'react';

const RadioButton = ({prices}) => {
  const [values, setValues] = useState(0);

  return prices.map((price, idx) => {
    return <div key={idx}>
      <input type="radio" className="m-2" value={`${price._id}`} />
      <label className="form-check-label">{price.name}</label>
    </div>
  })
};

export default RadioButton;