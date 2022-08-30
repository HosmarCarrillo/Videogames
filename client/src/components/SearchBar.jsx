import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideoGame } from "../actions/index"
import '../components/SearchBar.css';


export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleImputVideoGame(el){
        el.preventDefault()
        setName(el.target.value)
        console.log(name)    
    }
    function handleSubmit(el){
        el.preventDefault()
        if(!name) return alert("Debes ingresar un nombre")
        dispatch(getNameVideoGame(name))
        setCurrentPage(1)
        setName ("")
    }

    return(
        <div>
            
            <div className="containerr">      
                <input 
                type= 'text'  
                value= {name} 
                placeholder = ' Buscar...' 
                onChange={(el) => handleImputVideoGame(el)} />
                <div className="btnn">
                    <button className="search" 
                    type="submit"  
                    onClick={(el)=> handleSubmit(el)} >Buscar</button>
                </div>
            </div>
        </div>

    )
}
