import app from './app';

const req = require.context('./arboles', true, /\.js$/);
const arboles = [];
const keys = req.keys();
keys.forEach((key) => arboles.push(req(key).default()));

app(arboles);
