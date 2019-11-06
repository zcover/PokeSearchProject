DROP DATABASE IF EXISTS pokesearch_app;

CREATE DATABASE pokesearch_app;

DROP TABLE IF EXISTS type_query;

CREATE TABLE type_query(
id SERIAL PRIMARY KEY,
name VARCHAR(255)
);

DROP TABLE IF EXISTS pokemon;

CREATE TABLE pokemon(
    name VARCHAR(255),
    pokemonType VARCHAR(255)
)

