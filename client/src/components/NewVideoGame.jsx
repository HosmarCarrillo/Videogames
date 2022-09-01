import React, {useState, useEffect} from "react";
import {addVideoGame, getGender} from "../actions/index";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {validate} from "./Validate"
import './NewVideoGame.css';

export default function VideoGameCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const gender = useSelector((state)=> state.gender)
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
      name: "",
      description: "",
      releaseDate: "",
      rating: "",
      platforms: [],
      image: "",
      gender: [],
    });
    console.log(input);    
    useEffect(() => {
        dispatch(getGender());
    },[dispatch]);
    
    function handleChange(el){
      setInput({
        ...input,
        [el.target.name]: el.target.value
        })
      setErrors(
        validate({
        ...input,
        [el.target.name]: el.target.value
        }
        ));
        console.log(input)
    }

    function handleSelect(el){
      if(!input.gender.includes(el.target.value)){
        setInput({
          ...input,
          gender: [...input.gender, el.target.value]

        })
      } 
    }

    function handleSubmit(el){    
      el.preventDefault();
      let validacion = (
        validate(input)
        )
        setErrors(validacion)
          if (Object.keys(validacion).length>0){
            alert("Hay Errores");
          return
          }
        dispatch(addVideoGame(input))
          setInput({
            name: "",
            description: "",
            releaseDate: "",
            rating:(""),
            platforms: [],
            image: "",
            gender: [],
          })
          history.push('/home')
          window.location.reload();
    }
    
    function handleDelete(el){
      setInput({
        ...input, // se trae el estado anterior
        gender: input.gender.filter(occ => occ !== el)
      })
    }
          
    function handleCheck(el){
      if (el.target.checked){   
        setInput({
            ...input,
              
              platforms: [...input.platforms, el.target.value + (", ")],  
          })
          setErrors(validate({
            ...input,
              [el.target.platforms]: el.target.value
          }
          ));
      } else if (!el.target.checked) {
        setInput({
            ...input,
              platforms: input.platforms.filter((gen) => gen !== el.target.value + (", ")),
        });
      }
    }

  return (
    <div className="contenedor2 act">
      <div className="imagen">
        <div className="separacion">
          <h1>Crea tu Video Juego</h1>
            <Link className="volver" to= '/home'><button>Volver</button></Link>
        </div>
        <form onSubmit={(el) => handleSubmit(el)}>
          <div className="input-form">
            <div className="g2">
              <div className="separacion">
                <label>Nombre:</label>
                <input
                  type="text"
                  required
                  defaultValue={input.name}
                  name="name"
                  placeholder="Nuevo Juego"
                  autoComplete="on"
                  onChange={(el)=>handleChange(el)}
                  />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div className="separacion">
                <label>Descripcion:</label>
                <input
                  type = "text"
                  defaultValue= {input.description}
                  placeholder="..."
                  name= "description"
                  onChange={(el)=>handleChange(el)}
                  />
                {errors.description && <p className="error">{errors.description}</p>}
              </div>
              <div className="separacion">
                <label>Lanzamiento:</label>
                <input
                  type="date"
                  required
                  defaultValue={input.releaseDate}
                  name="releaseDate"
                  onChange={(el)=>handleChange(el)}
                  />
                {errors.releaseDate && <p className="error">{errors.releaseDate}</p>}   
              </div>
              <div className="separacion">
                <label>Calificacion:</label>
                <input
                  type="number"
                  required
                  defaultValue={input.rating}
                  name="rating"
                  onChange={(el)=>handleChange(el)}
                  />
                {errors.rating && <p className="error">{errors.rating}</p>}
              </div>
              <div className="separacion">
                <label>Imagen:</label>
                <input className="inputimg"
                  type="text"
                  required
                  defaultValue={input.image}
                  name="image"
                  onChange={(el)=>handleChange(el)}
                  />
                {errors.image && <p className="error">{errors.image}</p>} 
              </div>
            </div>
            <div className="g1">
              <label>Plataformas:</label>
                <div className="radios">
                  <div className="X">
                    <div className="xdx">
                      <label>PC</label> 
                      <input type = "checkbox" name= "platforms" value= "PC" onClick={handleCheck}/>
                    </div>
                    <div className="xdx">
                      <label>PlayStation</label>
                      <input type = "checkbox" name= "platforms" value= "PlayStation" onClick={handleCheck}/>
                    </div>
                    <div className="xdx">
                      <label>Ps2</label>
                      <input type = "checkbox" name= "platforms" value= "Ps2" onClick={handleCheck}/>
                    </div>
                    <div className="xdx">
                      <label>Ps3</label>
                      <input type = "checkbox" name= "platforms" value= "Ps3" onClick={handleCheck}/>
                    </div>
                    <div className="xdx">
                      <label>Ps4</label>
                      <input type = "checkbox" name= "platforms" value= "Ps4" onClick={handleCheck}/>
                    </div>
                    <div className="xdx">
                      <label>Ps5</label>
                      <input type = "checkbox" name= "platforms" value= "Ps5" onClick={handleCheck}/>
                    </div>
                                        
                  </div>
                  <div className="X">
                    <div className="xdx">
                      <label>Xbox</label>
                      <input type = "checkbox" name= "platforms" value= "Xbox" onClick={handleCheck}/>
                    </div>
                    <div className="xdx">
                      <label>Xbox One</label>
                      <input type = "checkbox" name= "platforms" value= "Xbox One" onClick={handleCheck}/>
                    </div>
                    <div className="xdx">
                      <label>Nintendo</label>
                      <input type = "checkbox" name= "platforms" value= "Nintendo" onClick={handleCheck}/>
                    </div>
                    <div className="xdx">
                      <label>Switch</label>
                      <input type = "checkbox" name= "platforms" value= "Nintendo Switch" onClick={handleCheck}/>
                    </div>
                    <div className="xdx">
                      <label>GameCube</label>
                      <input type = "checkbox" name= "platforms" value= "GameCube" onClick={handleCheck}/>
                    </div>
                    <div className="xdx">
                      <label>Android</label>
                      <input type = "checkbox" name= "platforms" value= "Android" onClick={handleCheck}/>
                    </div>
                    <div className="er">
                    {errors.platforms && (
                      <p className="error-plat">{errors.platforms}</p>
                    )}     
                    </div>
                  </div>
                </div>
            </div>
            <div className="typesContainer">
              <select onChange={(el) => handleSelect(el)}>
                {input.gender.length === 19 ?
                <option>Seleccionaste todos los Generos</option>
                :
                gender.map((occ) => (
                <option key={occ.name} value={occ.name}>{occ.name}</option>
                ))
                }
              </select>
              {errors.gender && <p className="error-gene">{errors.gender}</p>}
              <div className="caja-de-generos">
                {input.gender.map(e=> 
                  <div className = "divOcc">
                      <button onClick={ () => handleDelete(e)}>{e}</button>
                  </div>
                  )}
              </div>
            </div>
          </div>
          <div className="creargame">
            <button
              disabled={
              Object.values(errors).length < 0 
              }
              onClick={(e) => handleSubmit(e)}
              type="submit"
              >
              Crear VideoGame!
            </button>      
          </div>
        </form> 
      </div>
    </div>
  )
}