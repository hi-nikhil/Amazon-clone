import React,{useState,useEffect} from 'react';
import { db } from './firebase';
import './Orders.css'
import { useStateValue } from './StateProvider';
import Order from './Order'
 
function Orders() {
    const[{basket,user},dispatch]=useStateValue();
    const [orders,setOrders]=useState([]);

    //This is called evertime when user is changed
    useEffect(() => {
        console.log("The user is",user);
        if(user){
            console.log("user id>>",user?.uid)
            //Now to show the orders from the databse we fetch the 
            //order  of a particular user to show on orders page
            //path to get all orders from the databse
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created','desc')
            .onSnapshot(snapshot =>{
                setOrders(
                    snapshot.docs.map(doc =>({
                        id:doc.id,
                        data:doc.data()
                    }))
                )
            }) 
        }else{
            setOrders([])
        }

    
    }, [user])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            <div className="orders__order">
                {orders?.map(order => (
                    <Order order={order}/>

                ))}
            </div>
        </div>
    )
}

export default Orders
