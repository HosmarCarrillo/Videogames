require('dotenv').config();
const { Router } = require('express');
const axios = require ('axios');
const {Videogame, Gender} = require ('../db');
const {YOUR_API_KEY} = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const getApiInfoVideoGames = async () => {
    let apiInfoVideoGames=[];
    let apiUrl = `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
    for (let i = 0; i < 5; i++) {
    let apiUrlVideoGames = await axios.get(apiUrl);
    apiUrlVideoGames.data.results.map((el) => {
        apiInfoVideoGames.push({
            id: el.id,
            name: el.name, 
            releaseDate: el.released,
            rating: el.ratings[1].percent,
            platforms: el.platforms.map(p=>{ return p.platform.name + ", "}),
            image: el.background_image,
            gender:el.genres.map(p=>{return p.name}),
            description:el.description_raw,
            screenshop:el.short_screenshots, //.map(s=>{return s.image}),
        })
    })
    apiUrl = apiUrlVideoGames.data.next;
}
    return apiInfoVideoGames;
};



router.get("/", async (req, res)=>{
    const genderDb = await Gender.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

    if (!genderDb.length) {

    const apiUrlGender = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
    const apiInfoGender = await apiUrlGender.data.results.map(el => el.name);
    apiInfoGender.forEach((g) => {
        Gender.findOrCreate({
          where: { name : g},
        });
      });
      res.send(apiInfoGender);
    }else{
        res.send(genderDb);
}
})
const getDbInfo = async () => {
    const videoGames = await Videogame.findAll({
        include: {
            model: Gender,
            attributes: ["name"],
                through: {
                    attributes: [],
                } 
        },
    })
    const fixedVideoGames = []
    videoGames.forEach(game=> { // para cada uno
        const { genders, ...videogamesAtt } = game.dataValues
        const newVideoGame = {
            ...videogamesAtt, 
            gender:genders.map(g=>g.name)
        }
        fixedVideoGames.push(newVideoGame)
        console.log("🚀 ~ file: index.js ~ line 72 ~ getDbInfo ~ fixedVideoGames", fixedVideoGames)
    })
    
    return fixedVideoGames;
}

const getAllVideoGames = async () =>{
    const apiInfo = await getApiInfoVideoGames();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
        return infoTotal;
}

router.get("/videogames", async (req, res) => {
    const name = req.query.name;  
        let allVideogames = await getAllVideoGames();
        
        if (name) {
            let videoGamesName = allVideogames.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            return videoGamesName.length ?
                res.status(200).send(videoGamesName) :
                res.status(404).send("Este juego no Existe")
        }
            res.status(200).send(allVideogames)
    
    })

router.get('/videogames/:id', async (req, res)=>{ // params
    
    const { id } = req.params; // const {id} = req.params
    let videoGamesAll = await getAllVideoGames()
    if (id) {
        const foundVideoGames = videoGamesAll.find( p => p.id == id);
        
        if (foundVideoGames) {
            return res.json(foundVideoGames);
        } else {
            return res.json("El ID ingresado no pertenece a ningún Video Juego");
        }
    }
    
});

router.post("/videogames", async (req, res) => {
    const {
        name,
        description,
        releaseDate,
        rating,
        platforms,
        image,
        gender,
        createdInDb,
        
    } = req.body;
    console.log("🚀 ~ file: index.js ~ line 124 ~ router.post ~ req.body", req.body)
    
    // if (!name || !releaseDate || !rating ||  !platforms ||  !gender ||  !image ){
    //     return res.status(404).json({ msg: "Faltan datos" })
    // }
    let newVideoGame = await Videogame.create({
        name,
        description,
        releaseDate,
        rating,
        platforms,
        image,
        createdInDb,
    });

    let genderDb = await Gender.findAll({ 
        where: { name:gender },
    });
    newVideoGame.addGender(genderDb);
    return res.send("Video Juego creado con exito")
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
