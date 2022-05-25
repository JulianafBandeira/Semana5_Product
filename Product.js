import React, { useReducer } from 'react';
import './Product.css';





const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}


function getTotal(cart) {
    const total = cart.reduce((totalCost, item) => totalCost + item.price, 0)
    return total.toLocaleString(undefined, currencyOptions)
    
}



const products = [
    {
      emoji: '🍨',
      id: 'sorvete',
      price: 8
    },
    {
      emoji: '🍩',
      id: 'rosquinha',
      price: 20,
    },
    {
      emoji: '🍎',
      id: 'maçã',
      price: 10
    }
  ];




  function cartReducer(state, action) {
      switch(action.type){
          case 'adiciona':
          return [...state, action.product]
          case 'remove':
          const produto = state.findIndex(item => item.id === action.product.id)
          if( produto< 0){
                    return state
                }
          const update = [...state]
          update.splice(produto, 1)
            return update
            default:
                return state
      }
  }



  export default function Product() {
    const [cart, setCart] = useReducer(cartReducer, []);
  
    function add(product) {
      setCart({product, type: 'adiciona'});
    }


    function remove(product) {
        setCart({product, type: 'remove'})
    }
  

    return(
      <div className="wrapper">
      <div>
      Shopping Cart: {cart.length} total items.
      </div>
      <div>Total: {getTotal(cart)}</div>
      <div>
      {products.map(product => (
      <div key={product.id}>
      <div className="product">
      <span role="img" aria-label={product.id}>{product.emoji}</span>
      </div>
      <button onClick={() => add(product)} >Adiciona</button>
      <button onClick={() => remove(product)} >Remove</button>
      </div>
      ))}
      </div>
      </div>
    )
  }
