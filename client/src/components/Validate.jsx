export function validate(input){   
    let errors = {};
    const urlImg = (url) => {
        return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/.test(url);}
    
    if (!input.name.trim()){
        errors.name = 'Se requiere que ingreses un Nombre'
    }
    if (!input.rating.trim() || input.rating < 1 || input.rating > 50||/^[*'"-+=_]*$/.test(input.rating)) {
        errors.rating = 'Ingresa un Valor de Calificacion entre 0 y 50';
    }
    if (!input.releaseDate.trim()) {
        errors.releaseDate = 'Ingresa una fecha de Lanzamiento';
    }
    if (!input.platforms.length) {
        errors.platforms = 'Selecciona alguna Plataforma';
    }
    
    if ((!urlImg(input.image))) {
        errors.image = "Debes asignarle una imagen";
    }
    if (!input.gender) {
        errors.gender = "Debes seleccionar al menos un(1) Genero";
    }
    
    
    return errors;
}

