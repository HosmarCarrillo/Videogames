import React from "react";
import './Card.css';

export default function Card({name, image, rating}) {
    return(
    <div className="bodi">
        <div className='card-g'>
            <div className='face front'>
                <h2>{name}</h2>
                <img src={image} alt='img default' width= '100%' height= '100%'  />
                <label className="strat"> ★★★ {rating}</label>
            </div>
        </div>
    </div>
    );
}