const initialState = {
  loggedIn: false,
  products: [],
  carts: [],
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOGGEDIN':
      return {
        ...state,
        loggedIn: action.data,
      }
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.data,
      }
    case 'SET_CARTS':
      return {
        ...state,
        carts: action.data,
      }
    default:
      return state;
  }
}
