import { ICartProduct, ShippingAddress } from '@/interfaces';
import { CartState } from './';

type CartType =
      | {type: 'Cart - LoadCart from cookies | storage', payload: ICartProduct[] }
      | {type: 'Cart - Update products in cart | storage', payload: ICartProduct[]}
      | {type: 'Cart - Change product quantity | storage', payload: ICartProduct}
      | {type: 'Cart - Remove product in cart | storage', payload: ICartProduct}
      | {type: 'Cart - Load Address from cookies | storage', payload: ShippingAddress}
      | {type: 'Cart - Update Address', payload: ShippingAddress}
      | {
        type: 'Cart - Update order summary | storage', 
        payload: {
          numberOfItems: number;
          subTotal: number;
          tax: number;
          total: number;
        }
      }
      | {type: '[Cart] - Order Complete'}

export const cartReducer = (state: CartState, action: CartType): CartState => {

       switch (action.type) {
            case 'Cart - LoadCart from cookies | storage':
               return {
                   ...state,
                   isLoaded: true,
                   cart: [...action.payload]
                       }

            case 'Cart - Update products in cart | storage':
               return {
                ...state,
                cart: [...action.payload]

               } 

               case 'Cart - Change product quantity | storage':
               return {
                ...state,
                cart: state.cart.map(product => {
                  if (product._id !== action.payload._id) return product;
                  if (product.size !== action.payload.size) return product;
                  return action.payload;
                })
               } 

               case 'Cart - Remove product in cart | storage':
                return {
                 ...state,
                  cart: state.cart.filter(product => !(product._id === action.payload._id && product.size === action.payload.size))
 
                } 

                case 'Cart - Update order summary | storage':
                  return {
                    ...state,
                    ...action.payload
                  }

                case 'Cart - Update Address':  
                case 'Cart - Load Address from cookies | storage':
                  return {
                    ...state,
                    shippingAddress: action.payload
                  }

                case '[Cart] - Order Complete':
                  return {
                    ...state,
                    cart: [],
                    numberOfItems: 0,
                    subTotal: 0,
                    tax: 0,
                    total: 0
                  }

            default:
              return state;
         }

}