import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider'

function CheckoutProduct({id,image,title,price,rating,hideButton}) {

    const [{basket},dispatch]=useStateValue();

    const removeFromBasket=() =>{
        //remove the item from basket
        dispatch({
            type:'REMOVE_FROM_BASKET',
            id:id,
        })
    }
    return (
        <div className="checkoutProduct">
            <img className='checkoutProduct__image' src={image} />

            <div className="checkoutProduct__info">
               <p className="chekoutProduct__title">
                   {title}
               </p>
               <p className="chekoutProduct__price">
                   <small>₹</small>
                   <strong>{price}</strong>
               </p>
               <div className="checkoutProduct__rating">
                 {Array(rating).fill().map((_, i) => (
                            <p>⭐</p>
                        ))}
               </div>
               {!hideButton && (
                       <button onClick={removeFromBasket}>Remove From Basket</button>
               )}
               

            </div>


        </div>
    )
}

export default CheckoutProduct
