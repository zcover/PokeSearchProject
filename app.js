'use strict';

function Pokemon(pokemon){
  this.image_url = pokemon.image_url;
  this.name = pokemon.name;
  this.dexEntry = pokemon.dexEntry;
  this.pokemons = pokemon.pokemons;
}

Pokemon.allPokemons = [];

Pokemon.prototype.render = function(){
  $('main').append('<div class = "copy"></div>');
  let pokemonCopy = $('div[class = "copy"]');
  let pokemonHtml = $('#photo-template').html();

  pokemonCopy.html(pokemonHtml);

  pokemonCopy.find('img').attr('src',this.image_url);
  pokemonCopy.find('img').attr('alt',this.keyword);
  pokemonCopy.find('h2').text(this.name);
  pokemonCopy.find('p').text(this.dexEntry);
  pokemonCopy.removeClass('copy');
  pokemonCopy.attr('class','photo-template');
};

function dropDown() {
  let uniqueElements = [];
  let optionHtml = $('#drop-down');
  Pokemon.allPokemons.forEach(image => {
    let bananas = true;
    uniqueElements.forEach(uniqueImage => {
      if(image.keyword === uniqueImage){
        bananas = false;
      }
    });
    if(bananas){
      optionHtml.append($('<option></option>').attr('value', image.keyword).text(image.keyword));
      uniqueElements.push(image.keyword);
    }
  });
}

let page1 = [];
let page2 = [];

Pokemon.readJson = () => {
  $.get('data/page-1.json')
    .then(data =>{
      data.forEach(item =>{
        Pokemon.allPokemons.push(new Pokemon(item));
        page1.push(new Pokemon(item));
      });
    }).then(
      $.get('data/page-2.json')
        .then(data =>{
          data.forEach(item =>{
            Pokemon.allPokemons.push(new Pokemon(item));
            page2.push(new Pokemon(item));
          });
        })
        .then(Pokemon.loadPokemons));
};

Pokemon.loadPokemons = () => {
  page1.forEach(pokemon => {
    let pokemonHtml = template(pokemon);
    $('#page-1').append(pokemonHtml);
  });
  dropDown();
  $('#drop-down').on('change', function() {
    $('div').hide();
    const keyword = $('#drop-down option:selected').text();
    $(`img[alt=${keyword}]`).parent().show();
  });
  $('#drop-down-sort').on('change', function() {
    console.log('Hentai');
    // If first value... sort


    // If second value... sort


    // Else ?
    // const sortNumbersByLength = (arr) => {
    //   // Solution code here...
    //   arr.sort((a, b) => {
    //     return a.toString().length - b.toString().length;
    //   });
    //   return arr;
    // };

  });
};


$('#reset').click(function() {
  $('#drop-down').prop('selectedIndex', 0);
  $('#page-1').empty( );
  $('#page-2').empty( );

  page1.forEach(pokemon => {
    const pokemonHtml = template(pokemon);
    $('#page-1').append(pokemonHtml);
  });
});

$('#page1').click(function() {
  $('#drop-down').prop('selectedIndex', 0);
  $('#page-1').empty( );
  $('#page-2').empty( );

  page1.forEach(pokemon => {
    const pokemonHtml = template(pokemon);
    $('#page-1').append(pokemonHtml);
  });
});

$('#page2').click(function() {
  $('#drop-down').prop('selectedIndex', 0);
  $('#page-1').empty( );
  $('#page-2').empty( );

  page2.forEach(pokemon => {
    const pokemonHtml = template(pokemon);
    $('#page-2').append(pokemonHtml);
  });
});



//////////handlebars////////////
var source   = document.getElementById('handlebars-page-1').innerHTML;
var template = Handlebars.compile(source);



