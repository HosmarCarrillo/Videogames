import React, { useState } from 'react';
import { useEffect,} from 'react';
import {useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideoGames, getGender, orderByName, orderByRating, filterVideoGamesByGender, filterCreated, clearState } from "../actions";
import Card from './Card.jsx'
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import gip from "../pictures/gip.gif"
import sub from "../pictures/sub.gif"
import './Home.css';

export default function Home () {
    const dispatch = useDispatch()
    const allGender = useSelector((state)=> state.gender)
    const allVideoGames = useSelector ((state)=> state.videogame) 
    const [currentPage, setCurrentPage] = useState(1)
    const [orden, setOrden] = useState ('');
    const [loaded,setLoaded] = useState(allVideoGames.length?true:false);
    const [videoGamePrePage] = useState(15)
    const indexOfLastVideoGame = currentPage * videoGamePrePage
    const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamePrePage
    const currentVideoGame = allVideoGames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
    const paginado = (pageNumber)=> {
        setCurrentPage(pageNumber)
    };

    function handleFilterGender(e) {
        e.preventDefault()
        dispatch(filterVideoGamesByGender(e.target.value));
        setCurrentPage(1);
    };

    function handleSort (el){
        el.preventDefault();
        dispatch(orderByName(el.target.value))
        setOrden(`Ordenado ${el.target.value}`)
        setCurrentPage(1);
    };

    function handleSortR (el){
        el.preventDefault();
        dispatch(orderByRating(el.target.value))
        setOrden(`Ordenado ${el.target.value}`)
        setCurrentPage(1);
    };

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideoGames());
    };
    useEffect(()=>{
        if(!loaded){
            dispatch(getVideoGames());
            dispatch(getGender())
        }
    },[loaded,dispatch]);

    function handleSelec (el){
        dispatch(filterCreated(el.target.value))
        setCurrentPage(1);    
    };

    return(
        allVideoGames.length>0 ?(
            <div className='container-todo'>
                <div className='cont-lateral'>
                    <div className='sub'>
                        <img src={sub} width= "250px" height= "400px" alt="Loading" />
                    </div>
                    <div className='container barr'>
                        <div className='ordenar'>
                            <select className="stylehome" onChange={(e) => handleFilterGender(e)}>
                                <option value="All" selected disabled>Generos</option>
                                    {allGender.map((t)=>
                                    <option value= {t.name} key = {t.id}>{t.name}</option>
                                    )}
                            </select>
                        </div>
                        <div className='ordenar'>
                            <select onChange={ (el)=> {handleSortR(el)}}>
                                <option value="All"selected disabled>Calificacion</option>
                                <option value = 'asc'>Mayor</option>
                                <option value = 'desc'>Menor</option>
                            </select> 
                        </div>
                        <div className='ordenar'>
                            <select onChange={(el)=> {handleSort(el)}}>
                                <option value="All" selected disabled>Orden</option>
                                <option value = "desc">A-Z</option>
                                <option value = "asc">Z-A</option>
                            </select> 
                        </div>
                        <div className='ordenar'>
                            <select onChange={(el)=>handleSelec(el)}>
                                <option value="All" selected disabled>Origen</option>
                                <option value="created">Creados</option>
                                <option value="api">Api</option>
                            </select>
                        </div>
                        <div>
                            <SearchBar setCurrentPage={setCurrentPage}/>
                            <div className='ordenar'>
                                <button onClick={e=>{handleClick(e)}}>Cargar Juegos</button>
                            </div>
                        </div>
                        <div className='link'>
                            <Link className='crear' to= '/videogames' >CREAR NUEVO JUEGO</Link>
                        </div>
                        {/* <div className='barr3'>
                            <Paginado
                                videoGamePrePage = {videoGamePrePage}
                                allVideoGames = {allVideoGames.length}
                                paginado = {paginado}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                            />
                        </div> */}
                    </div>
                </div> 
                <div>
                    <div className= "container grid">
                    {currentVideoGame.map((g)=>{
                        return ( 
                            <div key={g.id} className='item'>
                                <Link to= {`/detail/${g.id}`}>              
                                    <Card name= {g.name} image= {g.image} rating={g.rating}/>
                                </Link> 
                            </div>         
                        );
                    })};
                    </div> 
                    <div className='barr3'>
                        <Paginado
                            videoGamePrePage = {videoGamePrePage}
                            allVideoGames = {allVideoGames.length}
                            paginado = {paginado}
                            etCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            />
                    </div>
                    
                </div>                           
            </div>
            ):
            <div className="gif">
                <img src={gip} width= "600px" height= "600px" alt="Loading" />
                <p>Cargando...</p>
            </div>
    );
};