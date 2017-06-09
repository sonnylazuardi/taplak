const initialState = {
  loggedIn: false,
  products: [],
  carts: [],
  categories: [],
  userData: {},
  loading: false,
  userProfile: {},
  cachedProductsData: {},
  pendingAddFavouriteIds: [],
  pendingRemoveFavouriteIds: [],
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
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.data,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.data
      }
    case 'SET_USER_PROFILE':
      return {
        ...state,
        userProfile: action.data,
      }
    case 'CACHE_PRODUCTS_DATA':
      return {
        ...state,
        cachedProductsData: {
          ...state.cachedProductsData,
          [action.data.keyword]: action.data.result,
        }
      }
    case 'QUEUE_ADD_FAVOURITE':
      return {
        ...state,
        pendingAddFavouriteIds: [
          ...state.pendingAddFavouriteIds,
          action.data,
        ],
      }
    case 'QUEUE_REMOVE_FAVOURITE':
      return {
        ...state,
        pendingRemoveFavouriteIds: [
          ...state.pendingRemoveFavouriteIds,
          action.data,
        ],
      }
    case 'CLEAR_PENDING_FAVOURITE':
      return {
        ...state,
        pendingAddFavouriteIds: [],
        pendingRemoveFavouriteIds: [],
      }
    case 'CACHE_CATEGORIES_DATA':
      return {
        ...state,
        categories: action.data
      }
    default:
      return state;
  }
}
