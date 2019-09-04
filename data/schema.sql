CREATE DATABASE pokesearch_app;

DROP TABLE IF EXISTS type_query;

CREATE TABLE type_query(
    id SERIAL PRIMARY KEY,
    NAME = VARCHAR(255)
);