'use strict'

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;

app.get('/');







app.listen(PORT, () => console.log(`up on port ${PORT}`));
