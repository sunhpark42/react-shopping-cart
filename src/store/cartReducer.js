import { ACTION_TYPE } from '../constants';

const initialState = {
  cart: [],
};

export const addItemToCart = data => {
  return {
    type: ACTION_TYPE.ADD_ITEM_TO_CART,
    payload: data,
  };
};

export const setCartItemList = data => {
  return {
    type: ACTION_TYPE.SET_CART_ITEM_LIST,
    payload: data,
  };
};

export const toggleCartItemCheckbox = id => {
  return {
    type: ACTION_TYPE.TOGGLE_CART_ITEM_CHECKBOX,
    payload: { id },
  };
};

export const setAllCartItemCheckbox = isChecked => {
  return {
    type: ACTION_TYPE.SET_ALL_CART_ITEM_CHECKBOX,
    payload: { isChecked },
  };
};

export const setCartItemQuantity = ({ id, quantity }) => {
  return {
    type: ACTION_TYPE.SET_CART_ITEM_QUANTITY,
    payload: { id, quantity },
  };
};

export const deleteCartItems = idList => {
  return {
    type: ACTION_TYPE.DELETE_CART_ITEMS,
    payload: { idList },
  };
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_ITEM_TO_CART:
      return {
        ...state,
        cart: [...state.cart.filter(({ id }) => id !== action.payload.id), action.payload],
      };

    case ACTION_TYPE.SET_CART_ITEM_LIST:
      return {
        ...state,
        cart: action.payload,
      };

    case ACTION_TYPE.TOGGLE_CART_ITEM_CHECKBOX:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                checked: !item.checked,
              }
            : item,
        ),
      };

    case ACTION_TYPE.SET_ALL_CART_ITEM_CHECKBOX:
      return {
        ...state,
        cart: state.cart.map(item => ({
          ...item,
          checked: !action.payload.isChecked,
        })),
      };

    case ACTION_TYPE.SET_CART_ITEM_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: action.payload.quantity,
              }
            : item,
        ),
      };

    case ACTION_TYPE.DELETE_CART_ITEMS:
      return {
        ...state,
        cart: state.cart.filter(item => !action.payload.idList.includes(item.id)),
      };

    default:
      return state;
  }
};
