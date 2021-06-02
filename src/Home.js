import React from 'react'
import "./Home.css";
import Product from './Product';


// shortcut for import function is rfce
function Home() {
    return (
        <div className="home">
           <div className="home__container">
               {/* Background  image at top which faded while going downward */}
               <img 
               className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2021/X-site/SingleTitle/Supergirl/1500x600_Hero-Tall_JPN._CB667341638_.jpg"  />

               <div className="home__row">
                 <Product id="12452651" title="Adidas Men's Ultimashow Running Shoe" price={3257.00} image='https://images-na.ssl-images-amazon.com/images/I/71qdlp6Zj9L._UL1500_.jpg' rating={4}/>

                 <Product  id="14562135" title="Blue Moon Swing Chair with Stand,Cushion (Orange Colour) & Hook-Outdoor/Indoor/Balcony/Garden/Patio (Standard, Green) Rattan Wicker/ Outdoor Swing Chair" price={12899.00} image='https://images-na.ssl-images-amazon.com/images/I/41qKpD99O7L.jpg' rating={5}/>
               </div>

               <div className="home__row">
               <Product id="1245825" title="Fujifilm Instax Mini 9 Instant Camera (Ice Blue)" price={3999} image='https://images-na.ssl-images-amazon.com/images/I/41Tkc0eppxL._SY355_.jpg' rating={4}/>

               <Product id="12452572" title="New Apple iPhone 12 Pro Max (256GB) - Gold" price={132900.00} image='https://images-na.ssl-images-amazon.com/images/I/71fJ-gmBZtL._SL1500_.jpg' rating={4}/>

               <Product id="124587621" title="Apple MacBook Pro (16-inch, 16GB RAM, 1TB Storage, 2.3GHz 9th Gen Intel Core i9) - Silver" price={224990} image='https://images-na.ssl-images-amazon.com/images/I/71y%2BlIHVdAL._SL1500_.jpg' rating={5}/>

               </div>

               <div className="home__row">
               <Product id="1245895" title="PHILIPS Brilliance 499P9H1/75 49-inch Curved SuperWide Dual QHD LCD Display with Pop-Up Webcam with Windows Hello" price={131000} image='https://images-na.ssl-images-amazon.com/images/I/61QsG3AkxaL._SL1181_.jpg' rating={4}/>

               <Product id="12458762" title="Samsung 345L 3 Star Inverter Frost Free Double Door Refrigerator (RT37T4513S8/HL, Elegant Inox, Convertible)" price={38760} image='https://images-na.ssl-images-amazon.com/images/I/71pfYtV2upL._SL1500_.jpg' rating={4}/>
               </div>
           </div>
            
        </div>
    )
}

export default Home




