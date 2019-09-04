'use strict'

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;
app.set('view engine', 'ejs');


//home page
// app.get('/home', (req, res) => {
//   res.render('./index');
// });

app.get('/home', askApi)

//make a request from pokeApi
const url = 'https://pokeapi.co/api/v2/type/'

function askApi(req, res){
  // const searchType = req.body.pokemonTyping;
  const thesearch = 'water';
  const queryUrl = `${url}${thesearch}`;
  console.log(queryUrl);

  //look at results
  superagent.get(queryUrl).then(result => {
    //   loops through first 25 pokemon of type

    // =====KEEEP JUST IN CASE!!!=====
    //for(let i = 0; i<25;i++){
    //    let pokeres = result.body.pokemon[i].pokemon.name
    //    //narrow down to individual name
    //    console.log(`logging pokeRes ${pokeres}`)
    //    let pokeRes = result.body.pokemon[i].pokemon.name;
    //    console.log(`logging pokeRes ${pokeRes}`);
    //   };
    // =================================

    let pokeRes = result.body.pokemon[0].pokemon.name;
    console.log(`logging pokeres ${pokeRes}`);

    const pokePath = result.body.pokemon.slice(0, 25)
    console.log('logging pokepath', pokePath);

    const newpokePath = pokePath.map(pokemon => {
      return new Pokemon(pokemon)
    });

    console.log(newpokePath)
    res.render('./index', {resultPokemon : newpokePath})
  }).catch(error => console.error(error))
}

//narrow down to body
function Pokemon(pokemon) {
  this.name = pokemon.pokemon.name
}







app.listen(PORT, () => console.log(`up on port ${PORT}`));
