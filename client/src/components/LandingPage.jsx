import React from 'react';
import {Link} from 'react-router-dom';
import "./LandingPage.css";

export default function LandingPage(){
    return(
        <div className="contenedor3">
            <div className='texto' >
                <p>Video Games</p>
                <h1>Proyecto Individual</h1>
                <Link to ='/home'>
                    <button2>INGRESA!!</button2>
                </Link>
            </div>
        </div> 
    )
}