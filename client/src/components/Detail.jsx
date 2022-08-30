import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideoGames,  } from "../actions"; // deleteVideoGame
import { useHistory } from "react-router-dom";
import { getDetail, clearState } from "../actions"; //clearVideoGameById,
import { useEffect , useState} from "react";
import file from "../pictures/file.gif";
import fort from "../pictures/Fort.gif"
import CardGender from './CardGender'
import './Detail.css'


export default function Detail (){
    const history = useHistory();
    const dispatch = useDispatch()
    let {id}= useParams();
    

    useEffect(() => {
        dispatch(getDetail(id));
        // return ()=> {
        //     dispatch(clearVideoGameById());
        // }        
    },[dispatch, id]);

    const myVideoGame = useSelector ((state)=> state.detail)
    console.log("🚀 ~ file: Detail.jsx ~ line 28 ~ Detail ~ myVideoGame", myVideoGame)

    const clearHome = () => {
        dispatch(clearState());
      };

    // function handleOnClick(id) {
    //     dispatch(deleteVideoGame(id))
    //     dispatch(getVideoGame())
    //     history.push("/home")
    // }

    return (
        myVideoGame.id 
        ? ( 
            <div className="contenedor4 detalle" key = {myVideoGame.id}>
                <div className="imagen2">
                    {/* <img src={file} alt='' ></img> */}
                <div className="bar">
                    <Link to= {'/home'}><button className="crear2" onClick={clearHome} >Volver</button></Link>
                    
                </div>
                </div>  
                <div className="todoo">
                    <div className="titulo">
                <h1>{myVideoGame.name}</h1>
                    </div>
                <div className="todo">
                <div className="titulo">
                    <div className="game">
                        <img src={myVideoGame.image} alt = {myVideoGame.name} width= "600px" height= "400px" ></img>
                </div>
                    </div>
                    <div className="detalle2">
                        <div className="detail">
                            <div className="xd">
                                <h2>Fecha de lanzamiento: {myVideoGame.releaseDate}</h2>
                            </div>
                            <div className="xd">
                                <h2>Calificacion: ★★★ {myVideoGame.rating}</h2>
                            </div>
                            <div className="xd">
                                <h2>Plataformas: {myVideoGame.platforms}</h2>
                            </div>
                            <div className="xd">
                                <h2>Descripcion: {myVideoGame.description}</h2>
                            </div>
                         
                        </div>
                    </div>
                    <div className="card-gend">
                        <h1>Genero:</h1>
                        { myVideoGame.gender.map(el=> {
                            return(
                            <div >
                                <CardGender key= {el} name= {el}/>   
                            </div>
                            )
                        })}
                    </div>
                </div> 
                {!myVideoGame.createdInDb? 
                <div className="carru">
                    <img src={myVideoGame.screenshop[1].image} alt = {myVideoGame.name} width= "200px" height= "150px"/>
                    <img src={myVideoGame.screenshop[2].image} alt = {myVideoGame.name} width= "200px" height= "150px"/>
                    <img src={myVideoGame.screenshop[3].image} alt = {myVideoGame.name} width= "200px" height= "150px"/>
                    <img src={myVideoGame.screenshop[4].image} alt = {myVideoGame.name} width= "200px" height= "150px"/>
                    <img src={myVideoGame.screenshop[5].image} alt = {myVideoGame.name} width= "200px" height= "150px"/>
                    <img src={myVideoGame.screenshop[6].image} alt = {myVideoGame.name} width= "200px" height= "150px"/>
                </div>
                : 
                <img src={myVideoGame.image} alt = {myVideoGame.name} width= "200px" height= "150px"/>
            }
                </div> 
                {/* <div className="eliminar">
                    {myVideoGame.createdInDb && <button className="buttoneliminar" onClick={() => { handleOnClick(id) }}>Eliminar</button>
                    
                } 
                {console.log("🚀 ~ file: Card.jsx ~ line 34 ~ Card ~ createdInDb", myVideoGame.createdInDb)}
                </div>  */}
            </div>
        )
        : <div className="gif">
            <img src={fort} width= "500px" height= "500px" alt="Cargando..." />
            <p>Cargando...</p>
        </div>
    )
    
}
