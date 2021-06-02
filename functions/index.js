const functions = require("firebase-functions");
const express=require('express')
const cors=require('cors')
const stripe=require('stripe')('sk_test_51IxQk1SAIxFsm8YirPxzpgqhHADkYyhRuKkyK69foEzzMd0BRuApU0OuFwFlBDoJeRuvsY1BPW0j0wDgitEYP7rW00ImRdor33')

//API



//APP config
const app=express();

//Middleware
app.use(cors({origin:true}));
app.use(express.json());



//API routers
app.get('/',(req,res) =>{
    res.status(200).send('Hello  World!')
});

app.post("/payments/create",async (req,res) => {
    const total=req.query.total;

    console.log('Payments Received BOOM!!! for amount >>',total);

    const  paymentIntent=await stripe.paymentIntents.create({
        amount:total,
        currency:"INR",
    });

    //ok created
    res.status(201).send({
        clientSecret:paymentIntent.client_secret,
    });
});


//Listen command
exports.api=functions.https.onRequest(app);

//Example endpoint
//http://localhost:5001/clone-eec94/us-central1/api