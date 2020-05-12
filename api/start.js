require = require('esm')(module);
const { Server } = require('./server');
const path = require('path');
require('dotenv').config(path.join(__dirname, '../.env'));

new Server().start();
