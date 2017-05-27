import Base64 from '../utils/Base64';
const BASE_URL = `https://api.bukalapak.com/v2`;

export function setLoggedIn(loggedIn) {
  return {
    type: 'SET_LOGGEDIN',
    data: loggedIn,
  }
}

export function setProducts(products) {
  return {
    type: 'SET_PRODUCTS',
    data: products,
  }
}

export function setCarts(carts) {
  return {
    type: 'SET_CARTS',
    data: carts,
  }
}

export function addToCart(product) {
  return (dispatch, getState) => {
    return fetch(`${BASE_URL}/carts/add_product/${product.id}.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then(data => {
      if (data.cart.length) {
        dispatch(setCarts(data.cart[0].items));
      }
      return data;
    });
  }
}

export function fetchProducts(keyword) {
  return (dispatch, getState) => {
    return fetch(`${BASE_URL}/products.json?keywords=${keyword}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then(data => {
      dispatch(setProducts(data.products));
      return data;
    })
  }
}

export function login(username, password) {
  return (dispatch, getState) => {
    console.log('Basic '+Base64.btoa(`${username}:${password}`));
    return fetch(`${BASE_URL}/authenticate.json`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic '+Base64.btoa(`${username}:${password}`),
      },
    })
    .then(res => res.json())
    .then(data => {
      console.log('DATA', data);
      return data;
    });
  }
}
