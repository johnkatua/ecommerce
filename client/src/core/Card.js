import React from 'react';
import {Link} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

const Card = ({product, showViewProductButton = true}) => {
  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className='mr-2'>
          <button className='btn btn-outline-primary m-2'>
            View Product
          </button>
        </Link> 
      )
    )
  };

  const showAddToCartButton = () => {
    return (
      <button className="btn btn-outline-success mt-2 mb-2">
        Add to cart
      </button>
    )
  }

  const showQuantity = (quantity) => {
    return (quantity > 0 ? (
       <span className='badge badge-primary badge-pill text-info border m-2'>In Stock</span>
     ) : (
       <span className='badge badge-primary badge-pill text-info border m-2'>Out of Stock</span>
     )
    )}
  return (
      <div className="card">
        <div className="card-header name">{product.name}</div>
          <div className="card-body">
            <ShowImage item={product} url='product' />
              <p className='lead mt-2'>{product.description.substring(0, 100)}</p>
              <p className='product-price'>Ksh{product.price}</p>
              <p className="product-category">
                Category: {product.category && product.category.name}
              </p>
              <p className="product-createdat">
                Added {moment(product.createdAt).fromNow()}
              </p>

              {showQuantity(product.quantity)}
              <br />

              {showViewButton(showViewProductButton)}

              {showAddToCartButton()}
          </div>
          
      </div>
  )
};

export default Card;