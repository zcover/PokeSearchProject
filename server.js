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


const client = new pg.Client(DATABASE_URL);
client.connect();
client.on('error', (error) => console.error(error));


//app.get('/', askApi)
//app.get('/favorites', onePokemon)
//app.get('/detail', showSinglePokemon)

app.use(methodOverride((req, res) =>{
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    let method = req.body._method;
    delete req.body._method
    return method;
  }
}));


// requests
//app.get('/', searchType)
//app.post('/search-query', askApi)


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

//save function
function onePokemon(req, res) {
  client.query('INSERT INTO type_query (+name) VALUES ($1)', [req.pokemon.pokemon.name]).then(() => {
    res.redirect('/');
  }).catch(error => {
    res.render('./pages/error');
    console.error(error);
  })
}

function showSinglePokemon(req, res) {
  client.query('SELECT * FROM books WHERE id = $1', [req.params.pokesearch_app]).then(sqlResult => {
    // check that there is a valid result, show not found if not a valid result
    res.render('./pages/pokemon/detail', { specificBook: sqlResult.rows[0] })
  }).catch(error => {
    res.render('./pages/error');
    console.error(error);
  })
}


// ===== LISTENING ON ========
app.listen(PORT, () => console.log(`up on port ${PORT}`));
