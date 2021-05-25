import {API} from '../config';

export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: 'GET'
  })
  .then(res => {
    return res.json()
  })
  .catch(error => {
    console.log(error)
  })
}