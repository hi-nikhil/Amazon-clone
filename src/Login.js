import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from './firebase'
import './login.css'

function Login() {
    const history=useHistory();
   const [email,setEmail]=useState('')
   const [password,setPassword]=useState('')

   const signIn= e =>{
       e.preventDefault();

       auth
       .signInWithEmailAndPassword(email,password)
       //If signIn is successful redirect to the home page
       .then(auth =>{
           history.push('/')
       })
       .catch(error => alert(error.message))


   }

   const register=e =>{
       e.preventDefault();

       //Firebase code for register new user
       auth
          .createUserWithEmailAndPassword(email,password)
          .then((auth) =>{
              //it successfully created a new user with email and password
              //this code redirect ot home page if login correctly
              if(auth){
                  history.push('/')
              }
          })
          .catch(error => alert(error.message))

   }

    return (
        <div className='login'>
            <Link to='/'>
            <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1000px-Amazon_logo.svg.png" alt="" />
            </Link>

            <div className="login__container">
                <h1>Sign-in</h1>

                <form action="">
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type="password"  value={password} onChange={e => setPassword(e.target.value)} />

                    <button onClick={signIn} className='login__signInButton' type='submit'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale.Please see our Privacy Notice,our Cookies Notice ans our Internet-Based Ads
                </p>

                <button   onClick={register} className='login__registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
