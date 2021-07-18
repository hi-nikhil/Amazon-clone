import React,{useState,useEffect} from 'react'
import './Payment.css'
import CheckoutProduct from './CheckoutProduct';
import { Link,useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from './reducer';
import {useStateValue} from "./StateProvider";
import axios from './axios';
import {db} from './firebase';

function Payment() {
    const [{ basket,user },dispatch] =useStateValue();
    const history=useHistory();

    //For stripe.js
    const stripe=useStripe();
    const elements=useElements();

    const[succeeded,setSucceeded]=useState(false);
    const[processing,setProcessing]=useState("");
    const[error,setError]=useState(null);
    const[disabled,setDisabled]=useState(true);
    const[clientSecret,setClientSecret]=useState(true);

    //runs when payment components loads
    useEffect(() => {
       //generate the special stripe secret which allows us to charge a customer

       const getClientSecret= async() => {
          const response= await axios({
              method:'post',
              //stripe expects the total in a currencies in subunits i.e. 
              //it accepts 100 paisa for 1 rupee
              //we multiply the total by 100 to conver it into paisa
              url:`/payments/create?total=${getBasketTotal(basket) * 100}`
          });
          setClientSecret(response.data.clientSecret)
       }

        //declare the function above and run it
        //useEffect run when the basket item is changed
        //whenever the basket item change the 'clientSecret' is changed 
        //because the total amount of items is changed
       getClientSecret();
    }, [basket])

    console.log('The SECRET is>>>',clientSecret)
    //console.log('person',user)

    const handleSubmit = async (event) => {
        //do all fancy stripe stuff
        event.preventDefault();
        //disable the button once you click it
        setProcessing(true);
         
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) =>{
            //after payment is done a response came back
            //but we need only 'paymentIntent' so we destructure it from response
            //paymentIntent= payment Confirmation

             //upload the orders of users in the database of Firebase(Firestore database)
             db
             .collection('users')
             .doc(user?.uid)
             .collection('orders')
             .doc(paymentIntent.id)
             .set({
                 basket: basket,
                 amount : paymentIntent.amount,
                 created: paymentIntent.created
             })

            setSucceeded(true);
            setError(null)
            setProcessing(false)
           
            //empty the basket when the payment is done
            //this functionality is implemented in reducer.js
            //react-context-api
            dispatch({
              type: 'EMPTY_BASKET'  
            })
              //when the payment is completed throw the user to 'Orders' page
            history.replace('/orders')

        })
        

    }

    const handleChange= event =>{
       //Listen the changes in the CardElement
        //and display any errors as the customes typees their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message :""); 
    } 

    return (
        <div className='payment'>
            <div className="payment__container">

                <h1>
                    Checkout{
                        <Link to="/checkout">({basket?.length} items)</Link>
                    }
                </h1>
            
             <div className="payment__section">
                 <div className="payment__title">
                     <h3>Delivery Address</h3>
                 </div>
                 <div className="payment__address">
                     <p>{user?.email}</p>
                     <p>123 Karol Bagh</p>
                     <p>Delhi,India</p>
                 </div>

             </div>


             <div className="payment__section">
                 <div className="payment__title">
                     <h3>Review items ans delivery</h3>
                 </div>

                 <div className="payment__items">
                     {basket.map(item => (
                          <CheckoutProduct  
                          id={item.id}
                          title={item.title}
                          image={item.image}
                          price={item.price}
                          rating={item.rating}
                          />
                     ))}
                 </div>

             </div>


             <div className="payment__section">
                 <div className="payment__title">
                     <h3>Payment Method</h3>
                 </div>

                 <div className="payment__details">
                     {/* Stripe magic */}
                     <form  onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange} />
                        <div className="payment__priceContainer">
                        <CurrencyFormat
                           renderText={(value) => (
                               <h3>Order Total: {value}</h3>
                            )}
                           decimalScale={2}
                           value={getBasketTotal(basket)}
                           displayType={"text"}
                           thousandSeparator={true}
                           prefix={"₹"}
                        />  
                        <button disabled={processing||disabled || succeeded}>
                          <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                          </button>
                          
                        </div>
                        {/* Error */}
                        {error && <div>{error}</div>}


                     </form>

                 </div>

             </div>


            </div>
            
        </div>
    )
}

export default Payment
