import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getOrders, getStatusValues, updateOrderStatus } from './ApiAdmin';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const {user, token} = isAuthenticated();

  const loadOrders = () => {
    getOrders(user._id, token)
      .then(data => {
        if(data.error) {
          console.log(data.error)
        } else {
          setOrders(data)
        }
      })
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token)
      .then(data => {
        if(data.error) {
          console.log(data.error)
        } else {
          setStatusValues(data)
        }
      })
  }

  useEffect(() => {
    loadOrders()
    loadStatusValues()
  }, []);

  const displayOrders = (orders) => {
    if(orders.length > 0) {
      return (
        <h1 className='text-danger display-2'>
          Total orders: {orders.length}
        </h1>
      ) 
    } else {
      return <h1 className='text-danger'>No orders</h1>
    }
  };

  const showInput = (key, value) => {
    return <div className='input-group  mb-2 mr-sm-2'>
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className='form-control' readOnly />
    </div>
  };

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value)
      .then(data => {
        if(data.err) {
          console.log('Status not updated')
        } else {
          loadOrders()
        }
      })
  }

  const showStatus = (order) => {
    return (
      <div className='form-group'>
        <h3 className="mark mb-4">Status: {order.status}</h3>
        <select className="form-control" onChange={(e) => handleStatusChange(e, order._id)}>
          <option>Update Status</option>
          {statusValues.map((status, idx) => {
            return  (
              <option key={idx} value={status}>{status}</option>
            )
          })}
        </select>
      </div>
    )
  }

  return (
    <Layout
      title='Orders'
      description={`Hello ${user.name}, you can manage all orders here!`}
      className='container-fluid'
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {displayOrders(orders)}
          {orders.map((order, idx) => {
            return (
              <div className='mt-5' key={idx} style={{borderBottom: '5px solid indigo'}}>
                <h2 className="mb-5">
                  <span className="bg-primary">
                    Order ID: {order._id}
                  </span>
                </h2>
                <ul className="list-group mb-2">
                  <li className="list-group-item">
                    {showStatus(order)}
                  </li>
                  <li className="list-group-item">
                    Transaction ID: {order.transaction_id}
                  </li>
                  <li className="list-group-item">
                    Amount: Ksh{order.amount}
                  </li>
                  <li className="list-group-item">
                    Ordered by: {order.user.name}
                  </li>
                  <li className="list-group-item">
                    Ordered on: {moment(order.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery address: {order.address}
                  </li>
                </ul>
                <h3 className="mt-4 mb-4 font-italic">
                  Total products in the order: {order.products.length}
                  <div className='mt-3'>Product Details</div>
                </h3>
                {order.products.map((product, pIdx) => {
                  return (
                    <div className='mb-4' key={pIdx} style={{padding: '20px', border: '1px solid indigo'}}>
                      {showInput('Product name', product.name)}
                      {showInput('Product price', product.price)}
                      {showInput('Product total', product.count)}
                      {showInput('Product Id', product._id)}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

    </Layout>
  )
};

export default Orders;