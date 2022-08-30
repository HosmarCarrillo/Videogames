import React from 'react';
import {Link} from 'react-router-dom';
// import pokeapp from "../pictures/pokeapp.png"
import "./LandingPage.css";

export default function LandingPage(){
    return(
        <div className="contenedor3">
            <div className='pokeapp'>
                    {/* <img src={pokeapp} alt='' height= '70px' ></img> */}
            <div className='texto' >
                
                <p>Proyecto Individual</p>
                <Link to ='/home'>
                    <button2>INGRESA!!</button2>
                </Link>
            </div>
            </div>
        </div> 
    )
}