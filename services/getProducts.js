import fetch from 'node-fetch';

const API_URL = 'https://fakestoreapi.com/products/category/electronics?limit=5'

const getProducts = () => {
  return fetch(API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.error)
    }
    return response.json()
  })
  .then(data => {
    return data
  })
  .catch(error => {
    console.error(error);
  });
}

export default getProducts