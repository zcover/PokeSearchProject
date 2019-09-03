'use strict'

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;
app.set('view engine', 'ejs');


//home page
app.get('/home', (req, res) => {
  res.render('./index');
});

app.get('/type-search', askApi)

//make a request from pokeApi
const url = 'https://pokeapi.co/api/v2/type/'

function askApi(req, res){
  // const searchType = req.body.pokemonTyping;
  const thesearch = 'water';
  const queryUrl = `${url}${thesearch}`;
  console.log(queryUrl);

  //look at results
  superagent.get(queryUrl).then(result => {
    //loops through first 25 pokemon of type
    for(let i = 0; i<25;i++){
      //narrow down to individual name
      console.log(result.body.pokemon[i].pokemon.name)
    }
  }).catch(error => console.error(error))
}


//narrow down to body





app.listen(PORT, () => console.log(`up on port ${PORT}`));
