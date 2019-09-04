'use strict'

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
const url = 'https://pokeapi.co/api/v2/type/'


//middleware
const methodOverride = require('method-override');

app.use(methodOverride((req, res) =>{
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    let method = req.body._method;
    delete req.body._method
    return method;
  }
}));


// requests
app.get('/', searchType)
app.post('/search-query', askApi)


// Functions
function searchType(req, res){
  res.render('./partials/search.ejs');
}

function askApi(req, res){
  const searchType = req.body.pokemonTyping;
  console.log('the search results include:', searchType)
  const queryUrl = `${url}${searchType}`;
  console.log(queryUrl);

  //look at results
  superagent.get(queryUrl).then(result => {
    const pokePath = result.body.pokemon.slice(0, 25)
    const newpokePath = pokePath.map(pokemon => {
      return new Pokemon(pokemon)
    });
    console.log('logging pokemon array', newpokePath);
    res.render('partials/searchResult.ejs', {resultPokemon : newpokePath})
  }).catch(error => console.error(error))
}




//narrow down to body
function Pokemon(pokemon) {
  this.name = pokemon.pokemon.name
}






// ===== LISTENING ON ========
app.listen(PORT, () => console.log(`up on port ${PORT}`));
